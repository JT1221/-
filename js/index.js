
var drawBoard = {
    cavs: document.getElementById("cavs"),
    ctx: document.getElementById("cavs").getContext("2d"),
    colorBtn: document.getElementById("color"),
    lineRuler: document.getElementById("lineRuler"),
    allUl: document.getElementsByTagName("ul")[0],
    imgArr:[],
    init: function () {
        this.ctx.lineCap = 'round'; //线条起始和结尾样式
        this.ctx.lineJoin = 'round'; //转弯
        this.allThings(),
        this.btnsFnAll()
    },
    allThings: function () {
        // console.log("1")
        var self = this;
        var left = this.cavs.offsetLeft;
        // 按下


        this.cavs.onmousedown = function (e) {
            var e_x = e.pageX;
            var e_y = e.pageY;
            self.ctx.beginPath();
            self.ctx.moveTo(e_x - left, e_y - left);

            var img=self.ctx.getImageData(0,0,self.cavs.offsetWidth, cavs.offsetHeight);
            self.imgArr.push(img)

            // 移动
            document.onmousemove = function (e) {
                self.ctx.lineTo(e.pageX - left, e.pageY - left);
                self.ctx.stroke()
            }
            // 抬起
            document.onmouseup = function (e) {
                this.onmousemove = null;
                self.ctx.closePath()
            }
            this.onmouseleave = function (e) {
                this.onmousemove = null;
            }
        }
    },
    btnsFnAll: function () {
        var self = this;
        // 画笔颜色
        this.colorBtn.onchange = function () {
            self.ctx.strokeStyle = this.value;
        },
            this.lineRuler.onchange = function () {
                self.ctx.lineWidth = this.value
            },
            this.allUl.addEventListener("click", function (e) {
                switch (e.target.id) {
                    // 清屏
                    case "cleanBoard":
                        self.ctx.clearRect(0, 0, self.cavs.offsetWidth, cavs.offsetHeight)
                        break;
                    // 橡皮
                    case "eraser":
                        self.ctx.strokeStyle="white";
                        break;
                    // 撤销
                    case "rescind":
                        if(self.imgArr.length>0){
                            self.ctx.putImageData(self.imgArr.pop(),0,0);
                        }

                        break;
                }
            })

    }
}
drawBoard.init()