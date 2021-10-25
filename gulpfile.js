/* ==============================
VARIABLES
 ================================ */
 let fileswatch = "html,htm,txt,json,md,woff2";
 const { src, dest, parallel, series, watch } = require("gulp");
 const browserSync = require("browser-sync").create();
 const webpack = require("webpack-stream");
 const scss = require("gulp-sass");
 const autoprefixer = require("gulp-autoprefixer");
 const rename = require("gulp-rename");
 const imagemin = require("gulp-imagemin");
 const newer = require("gulp-newer");
 const rsync = require("gulp-rsync");
 const pug = require("gulp-pug");
 const plumber = require("gulp-plumber");
 const cached = require("gulp-cached");
 const del = require("del");
 
 const folder = "aksi"; // Change project folder name
 /* ==============================
 TASK: PUG
	================================ */
 const html = () => {
	 return src("app/pug/*.pug")
		 .pipe(plumber())
		 .pipe(pug({ pretty: true }))
		 .pipe(plumber.stop())
		 .pipe(cached("pug"))
		 .pipe(dest("app/"));
 };
 
 /* ==============================
 TASK: STYLES
	================================ */
 const styles = () => {
	 return src("app/pug/styles.scss")
		 .pipe(scss())
		 .pipe(
			 autoprefixer({
				 overrideBrowserslist: ["last 10 versions"],
				 grid: true,
			 })
		 )
		 .pipe(rename("app.min.css"))
		 .pipe(dest("app/css"))
		 .pipe(browserSync.stream());
 };
 
 const stylesProd = () => {
	 return src("app/pug/styles.scss")
		 .pipe(scss({ outputStyle: "compressed" }))
		 .pipe(
			 autoprefixer({
				 overrideBrowserslist: ["last 10 versions"],
				 grid: true,
			 })
		 )
		 .pipe(rename("app.min.css"))
		 .pipe(dest("app/css"));
 };
 /* ==============================
 TASK: SCRIPTS
	================================ */
 const scripts = () => {
	 return src("app/js/app.js")
		 .pipe(
			 webpack({
				 mode: "production",
				 module: {
					 rules: [
						 {
							 test: /\.(js)$/,
							 exclude: /(node_modules)/,
							 loader: "babel-loader",
							 query: {
								 presets: ["@babel/env"],
							 },
						 },
					 ],
				 },
			 })
		 )
		 .on("error", function handleError() {
			 this.emit("end");
		 })
		 .pipe(rename("app.min.js"))
		 .pipe(dest("app/js"))
		 .pipe(browserSync.stream());
 };
 
 /* ==============================
 TASK: BROWSERSYNC
	================================ */
 const browsersync = () => {
	 browserSync.init({
		 server: {
			 baseDir: "app/",
		 },
		 notify: false,
		 online: true,
	 });
 };
 
 /* ==============================
 TASK: IMAGES
	================================ */
 const images = () => {
	 return src([`app/images/src/${folder}/**/*`])
		 .pipe(newer("app/images/dist"))
		 .pipe(imagemin())
		 .pipe(dest(`app/images/dist/${folder}`))
		 .pipe(browserSync.stream());
 };
 
 /* ==============================
 TASK: WATCHER
	================================ */
 const startwatch = () => {
	 watch("app/pug/**/*.pug", { usePolling: true }, html).on(
		 "change",
		 browserSync.reload
	 );
	 watch(["app/pug/**/*.scss"], { usePolling: true }, styles);
	 watch(
		 ["app/js/**/*.js", "app/pug/*.js", "!app/js/**/*.min.js"],
		 { usePolling: true },
		 scripts
	 );
	 watch(
		 "app/images/src/**/*.{jpg,jpeg,png,webp,svg,gif}",
		 { usePolling: true },
		 images
	 );
	 watch(`app/**/*.{${fileswatch}}`, { usePolling: true }).on(
		 "change",
		 browserSync.reload
	 );
 };
 /* ==============================
 TASK: CLEAN
	================================ */
 function cleanDev() {
	 return del(`production/${folder}/dev`, { force: true });
 }
 
 function cleanProd() {
	 return del(`production/${folder}/production`, { force: true });
 }
 
 function cleanDefault() {
	 return del(
		 [
			 "{app/pug,app/css,app/fonts}/**/*",
			 "app/images/dist",
			 "app/images/src/**/*",
			 "!app/pug/_template",
		 ],
		 { force: true }
	 );
 }
 /* ==============================
 TASK: PRODUCTION
	================================ */
 function production() {
	 return src(
		 [
			 "app/js/*.min.*",
			 "app/css/*",
			 `app/images/dist/${folder}/**/*`,
			 `app/fonts/${folder}/**/*`,
			 "app/*.html",
			 "!app/images/src/**/*",
		 ],
		 { base: "app/" }
	 ).pipe(dest(`production/${folder}/production`));
 }
 /* ==============================
 TASK: MOVE DEV
	================================ */
 function move() {
	 return src(
		 [
			 "{app/js,app/css,app/pug}/**/*",
			 `app/images/src/${folder}/**/*`,
			 `app/fonts/${folder}/**/*`,
			 "app/*.html",
		 ],
		 { base: "app/" }
	 ).pipe(dest(`production/${folder}/dev`));
 }
 /* ==============================
 EXPORTS
	================================ */
 exports.cleanDev = cleanDev;
 exports.cleanProd = cleanProd;
 exports.cleanDefault = cleanDefault;
 exports.html = html;
 exports.scripts = scripts;
 exports.styles = styles;
 exports.images = images;
 exports.assets = series(styles, scripts, images);
 // Default task
 exports.default = series(
	 scripts,
	 images,
	 styles,
	 parallel(browsersync, startwatch)
 );
 // Build production
 exports.build = series(
	 cleanProd,
	 scripts,
	 stylesProd,
	 styles,
	 images,
	 production
 );
 exports.move = series(cleanDev, move);