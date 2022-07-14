const { src, dest, parallel, series, watch } = require("gulp");

const browserSync = require("browser-sync").create();

const concat = require("gulp-concat");

const uglify = require("gulp-uglify-es").default;

const pug = require("gulp-pug");

const sass = require("gulp-sass")(require("sass"));

const autoprefixer = require("gulp-autoprefixer");

const cleancss = require("gulp-clean-css");

const imagecomp = require("compress-images");

const del = require("del");

function browsersync() {
	browserSync.init({
		server: { baseDir: "dist/" },
		notify: false,
		online: true,
	});
}

const pugBuild = () => {
	return src(["src/pug/pages/**/**.pug"])
		.pipe(pug({ pretty: true }))
		.pipe(dest("dist/"))
		.pipe(browserSync.stream());
};

function scripts() {
	return src(["src/js/index.js"])
		.pipe(concat("index.min.js"))
		.pipe(uglify())
		.pipe(dest("dist/js/"))
		.pipe(browserSync.stream());
}

function styles() {
	// outputStyle
	// Type: String
	// Default: nested
	// Values: nested, expanded, compact, compressed

	return src("src/" + "scss" + "/index." + "scss")
		.pipe(sass())
		.pipe(concat("index.min.css"))
		.pipe(
			autoprefixer({ overrideBrowserlist: ["last 10 versions"], grid: true })
		)
		.pipe(
			cleancss({ level: { 1: { specialComments: 0 } }, format: "beautify" })
		)
		.pipe(dest("dist/css/"))
		.pipe(browserSync.stream());
}

async function images() {
	imagecomp(
		"src/assets/**/*",
		"dist/assets/",
		{ compress_force: false, statistic: true, autoupdate: true },
		false,
		{ jpg: { engine: "mozjpeg", command: ["-quality", "100"] } },
		{ png: { engine: "pngquant", command: ["--quality=75-100", "-o"] } },
		{ svg: { engine: "svgo", command: "--multipass" } },
		{
			gif: { engine: "gifsicle", command: ["--colors", "64", "--use-col=web"] },
		},
		(err, completed) => {
			if (completed) browserSync.reload();
			if (err) console.log(err);
		}
	);
}

function cleanimg() {
	return del("dist/images/**/*", { force: true });
}

function buildcopy() {
	return src(
		[
			"src/css/**/*.min.css",
			"src/js/**/*.min.js",
			"src/images/dist/**/*",
			"src/fonts/**/*",
			"src/**/*.html",
		],
		{ base: "src" }
	).pipe(dest("dist"));
}

function cleandest() {
	return del("dist/**/*", { force: true });
}

function startWatch() {
	watch(["src/**/*.js", "!src/**/*.min.js"], scripts);

	watch("src/**/" + "scss" + "/**/*", styles);

	watch("src/**/*.pug", pugBuild);

	watch(["src/assets/images/**/*", "src/assets/icons/**/*"], images);
}

exports.browsersync = browsersync;

exports.pugBuild = pugBuild;

exports.scripts = scripts;

exports.styles = styles;

exports.images = images;

exports.cleanimg = cleanimg;

exports.build = series(cleandest, pugBuild, styles, scripts, images);

exports.default = parallel(
	styles,
	pugBuild,
	scripts,
	browsersync,
	images,
	startWatch
);
