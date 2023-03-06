//src para ideptificar el archivo
//dest para guardar el archivo
const {src,dest, watch, series, parallel}  = require ('gulp');//ubicamos el archivo y guasrdamos //watch sirve para escuchar
//todos los cambios en el archivo
const sass = require('gulp-sass')(require('sass'));//compilamos el archivo

const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');

//imagenes
const imagemin = require('gulp-imagemin');

/* para saber a que a archivo pertenece cada linea de código */
const sourcemaps = require('gulp-sourcemaps')



function css( done){
//src identifica el tipo de archivo
    src('src/scss/app.scss')
       /* agregamos el surcemaps para saber a que archivo pertenece cada linea de codigo */
       .pipe(sourcemaps.init())
    //compilamos el archivo
        .pipe(sass(/*{outputStyle: 'compressed'}*/))
        .pipe(postcss([autoprefixer()]))
        /* ideptificacmos cada linea  */
        .pipe(sourcemaps.write('.'))
        //guardamos la hoja de estilos
        .pipe(dest('build/css'))
        done();
}

function imagenes( done ){
        src('src/img/**/*')
        .pipe(imagemin({optimizationLevel: 3}))
        .pipe(dest('build/img'));

        done();

}

function dev(){
//watch tomas dos valores
//1 a que tengo que poner atencion a que archivo//    src('src/scss/app.scss')
 
        watch('src/scss/**/*.scss', css);//css llama de nuevo a la funcion anterior para veririficar su existen cambios en el archivo
        watch('src/img/**/*', imagenes);

}
exports.css = css;
exports.dev = dev;
exports.imagenes = imagenes;
exports.default= series(imagenes, css, dev);
//
