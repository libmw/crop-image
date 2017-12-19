import Emitter from 'tiny-emitter';
import deepExtend from 'deep-extend';
// clip就是一个裁剪框，给我一个container，我自己生成ui append进去，用户通过ui裁剪这个container，然后返回我裁剪完的区域，就酱
class CropUi extends Emitter{
    constructor(trigger, options){
        super();
        this._resolveOptions(options);
        this._buildCropFrame();
        this._buildMask();
        this._bindEvent();
    }

    _resolveOptions(options){
        this._options = deepExtend({
            container: null, //裁剪容器对应的dom
            cropFrame: { //裁剪框
                initialSize: { //裁剪框的初始大小，设置为auto或不设置则自动设置大小
                    width: 0,
                    height: 0
                },
                resize: { //裁剪框的缩放配置
                    enable: true, //是否允许缩放，默认true
                    ratio: 1 //缩放时长宽比，设置为auto则不限制缩放的长宽比，默认1
                }
            }
        }, options);
    }

    _buildCropFrame(){
        var cropFrameCtn = document.createElement('div');
        cropFrameCtn.className = 'crop-frame';
        cropFrameCtn.innerHTML = '<table style="" unselectable="on">'
            +'	<tbody>'
            +'		<tr class="">'
            +'			<td width="33.33%"></td><td width="33.33%"></td><td width="33.33%"></td>'
            +'		</tr>'
            +'		<tr class="">'
            +'			<td></td><td></td><td></td>'
            +'		</tr>'
            +'		<tr class="">'
            +'			<td></td><td></td><td></td>'
            +'		</tr>'
            +'	</tbody>'
            +'</table>'
            +'<div class="resize-btn r-nw"></div>'
            +'<div class="resize-btn r-sw"></div>'
            +'<div class="resize-btn r-ne"></div>'
            +'<div class="resize-btn r-se"></div>'
            +'<div class="resize-btn r-s"></div>'
            +'<div class="crop-tools"><div class="ci-btn-up"><i class="ci-btn-up-arrow"></i><i class="ci-btn-up-bd"></i></div><div class="ci-btn-cancel">X</div></div>'; //裁剪框
        this._options.container.appendChild(cropFrameCtn);
        var cropFrameBlock = undefined;
    }

    _buildMask(){
        var maskCanvas = document.createElement('canvas');
        maskCanvas.className = 'crop-mask';
        this._options.container.appendChild(maskCanvas);
        this._maskCanvasCtx = maskCanvas.getContext('2d');

    }
    _hollowOutMask(hollowRect){ //把遮罩挖空
        var maskCanvasCtx = this._maskCanvasCtx;
        this.maskCtx.fillStyle='rgba(0,0,0,0.2)';
        maskCanvasCtx.clearRect(0,0,maskCanvasCtx.canvas.width,maskCanvasCtx.canvas.height);
        maskCanvasCtx.fillRect(0,0,maskCanvasCtx.canvas.width,maskCanvasCtx.canvas.height);
        console.log('clipRect',hollowRect);
        maskCanvasCtx.clearRect(hollowRect.x, hollowRect.y, hollowRect.width, hollowRect.height);
    }
}
module.exports = CropUi;