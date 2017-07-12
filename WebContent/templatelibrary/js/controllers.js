/**
 * klxTemplate - Responsive Admin Theme
 *
 */

/**
 * MainCtrl - controller
 */
function MainCtrl() {
    this.userName = 'Example user';
    this.helloText = 'Welcome to Gtiles Console';
    this.descriptionText = '';
    this.navStart=1;
    this.navTitle="前端模板"
    this.activeNav=function(a,b){
    	this.navStart=a;
    	this.navTitle=b;
    	console.log(a);
    }
};


angular
    .module('klxTemplate')
    .controller('MainCtrl', MainCtrl)