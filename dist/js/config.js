/**
 * Created by Administrator on 2016/12/10.
 */

require.config({
    baseUrl: 'js/',
    patchs: {
        'jquery': 'jquery.min',
        'jquery-swiper': 'swiper.jquery.min',
        'flexible':'flexible',
        'layer': 'layer.js',
        'main':'main.js'
    },
    shim: {
        'jquery-swiper': ['jquery.min'],
        'flexible' :{
            exports: '_' 
        },
        'layer' :{
            exports: '_' 
        },
        'main' :{
            exports: '_' 
        },
    }
});

