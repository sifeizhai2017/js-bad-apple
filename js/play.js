window.onload = function () {
    let canvas = document.getElementById('cv');
    /**
     * 大部分画布绘制API都不是在<canvas>元素自身上定义的，而是定义在一个“绘制上下文”对象上
     *      获取该对象可以通过调用画布的getContext()方法。
     * 调用getContext()方法时，传递一个'2d'参数，会获得一个CanvasRenderingContext2D对象，使用
     *      该对象可以在画布上绘制二维图形。
     * 这里很重要的一点是要搞清楚，画布元素和他的上下文对象时两个完全不同的对象。
     */
    let context = canvas.getContext('2d');
    let txtDiv = document.getElementById('txt');
    let playBtn = document.getElementById("button");
    let audio = document.getElementById("audio");
    /**
     * Image()函数将会创建一个新的HTMLImageElement实例。
     *      
     * 它的功能等价于 document.createElement('img')
     */
    let img = new Image();
    let index = 1;
    let flag = false;

    playBtn.onclick = () => {
        // this.alert(canvas.width == img.width)
        // play();
        // this.alert('aaa')
        if (!flag) {
            play = true;
            playImg();
            audio.play();
            playBtn.value = '播放中';
        }
    }

    let playImg = () => {
        if (index++ < 4380) {
            img.src = '../img/badapple0' + format(index) + '.jpg';
            this.setTimeout(playImg, 50);
            // this.console.log(img.src);
        } else {
            playBtn.value = '播放完成';
            flag = false;
            index = 1;
            audio.load();
            img.src = '../img/badapple00000.jpg';
        }
    }

    let format = (index) => {
        let arr = index.toString().split('');
        for (let i = 0; arr.length < 4; i++) {
            /**
             * unshfit()和shift()方法的行为非常类似于push()和pop()，
             *      不一样的是前者是在数组的头部而非尾部进行元素的插入和删除操作。
             * unshift()在数组的头部添加一个或多个元素，并将已存在的元素移动到更高的索引位置
             *      来获得足够的空间
             */
            arr.unshift('0');
        }
        return arr.join('');
    }

    let toText = (g) => {
        if (g <= 17) {
            return '#';
        } else if (g > 17 && g <= 34) {
            return '#';
        } else if (g > 34 && g <= 51) {
            return 'H';
        } else if (g > 51 && g <= 68) {
            return 'Q';
        } else if (g > 68 && g <= 85) {
            return '&';
        } else if (g > 85 && g <= 102) {
            return 'O';
        } else if (g > 102 && g <= 119) {
            return 'C';
        } else if (g > 119 && g <= 136) {
            return '?';
        } else if (g > 136 && g <= 153) {
            return '7';
        } else if (g > 153 && g <= 170) {
            return '>';
        } else if (g > 170 && g <= 187) {
            return '!';
        } else if (g > 187 && g <= 204) {
            return ':';
        } else if (g > 204 && g <= 221) {
            return '-';
        } else if (g > 221 && g <= 238) {
            return ';';
        } else {
            return '.';
        }
    }

    let getGray = (r, g, b) => {
        return 0.299 * r + 0.578 * g + 0.114 * b;
    }

    let init = () => {
        txtDiv.style.width = img.width + 'px';
        canvas.width = img.width;
        canvas.height = img.height;
        context.drawImage(img, 0, 0);
        let imgData = context.getImageData(0, 0, img.width, img.height);
        let imgDataArr = imgData.data;
        let imgDataWidth = imgData.width;
        let imgDataHeight = imgData.height;
        let html = '';
        for (h = 0; h < imgDataHeight; h += 12) {
            let p = '<p>';
            for (w = 0; w < imgDataWidth; w += 6) {
                let index = (w + imgDataWidth * h) * 4;
                let r = imgDataArr[index + 0];
                let g = imgDataArr[index + 1];
                let b = imgDataArr[index + 2];
                let gray = getGray(r, g, b);
                p += toText(gray);
            }
            p += '</p>';
            html += p;
        }
        txtDiv.innerHTML = html;
    }

    img.src = '../img/badapple00000.jpg';
    img.onload = init;
}