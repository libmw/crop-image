import Emitter from 'tiny-emitter';
import deepExtend from 'deep-assign';
// clip就是一个裁剪框，给我一个container，我自己生成ui append进去，用户通过ui裁剪这个container，然后返回我裁剪完的区域，就酱
class CropImage extends Emitter{
    constructor(options){
        super();
        this._resolveOptions(options);
        this._buildUI();

    }

    _resolveOptions(options){
        this._options = deepExtend({
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
        console.log(this._options.container, options)
    }

    _buildUI(){
        var wrapper = document.createElement('div');
        var styles = require('./crop.less');
        wrapper.className = styles.cropImage;
        this._options.container.append(wrapper);
    }
}
module.exports = CropImage;
