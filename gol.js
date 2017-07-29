(function () {

    /* Gol object definition */
    function Gol(height, width, cellSize, targetCanvas) {
        /* variable property declarations and setup */
        this.height = height;
        this.width = width;
        this.cellSize = cellSize;
        this.canvas = targetCanvas;   
        this.canvasContext = this.canvas.getContext('2d'); 
        this.cells = Array(height).fill().map(() => Array(width).fill(0));    
        // this.canvasContext.strokeStyle = '#e1e1e1';
        this.canvasContext.fillStyle = 'blue';

        // cells = result;        
    }

    /* helper functions */
    Gol.prototype.setSize = function() {
        if (height !== canvas.parentNode.offsetHeight || width !== canvas.parentNode.offsetWidth) {
            height = canvas.parentNode.offsetHeight;
            width = canvas.parentNode.offsetWidth;
            canvas.setAttribute('height', canvas.parentNode.offsetHeight);
            canvas.setAttribute('width', canvas.parentNode.offsetWidth);
            // redraw();
        }
    }

    Gol.prototype.countNeighbours = function(x, y) {
        var self = this;        
        let amount = 0;

        function isFilled(x, y) {
            return self.cells[x] && self.cells[x][y];
        }

        if (isFilled(x-1, y-1)) amount++;
        if (isFilled(x,   y-1)) amount++;
        if (isFilled(x+1, y-1)) amount++;
        if (isFilled(x-1, y  )) amount++;
        if (isFilled(x+1, y  )) amount++;
        if (isFilled(x-1, y+1)) amount++;
        if (isFilled(x,   y+1)) amount++;
        if (isFilled(x+1, y+1)) amount++;
        
        return amount;
    }

    /* main functions */
    Gol.prototype.init = function() {
        // console.time() 
        for(let i=0; i<this.cells.length; i++) {
            for(let j=0; j<this.cells[i].length; j++) {
                this.cells[i][j] = Math.floor((Math.random() * 2));            
            }
        }
        // console.timeEnd()
        // console.log(cells);
    }

    Gol.prototype.update = function() {
        // let result = [];
        var self = this;
        
        this.cells.forEach(function(row, x) {
            // result[x] = [];
            row.forEach(function(cell, y) {
            let alive = 0;
            let count = self.countNeighbours(x, y);

            if (cell > 0) {
                alive = count === 2 || count === 3 ? 1 : 0;
            } else {
                alive = count === 3 ? 1 : 0;
            }

            self.cells[x][y] = alive;
            if (alive) {

            }

            });
        });
    }

    Gol.prototype.drawCell = function(x,y) {
        this.context.fillStyle = '#FF8871';
        this.context.fillRect(x * this.cellSize, y * this.cellSize, this.cellSize, this.cellSize);
    }

    Gol.prototype.clearCell = function(x,y) {
        // var key = coords2key(x,y);
        if (key in this.cells) {
            delete this.cells[key];
            this.context.clearRect(x * this.cellSize, y * this.cellSize, this.cellSize, this.cellSize);
        }
    }

    Gol.prototype.draw = function() {         
        var self = this;        
        this.canvasContext.clearRect(0, 0, this.width*8, this.height*8);

        this.cells.forEach(function(row, x) {
            row.forEach(function(cell, y) {
                self.canvasContext.beginPath();
                self.canvasContext.rect(x*8, y*8, 8, 8);
                if (cell) {
                    self.canvasContext.fill();
                } else {
                    // canvasContext.stroke();
                }
            });
        });
        //window.requestAnimationFrame(update); // Too fast!
    }
    
    
    /* kickoff */
    let targetCanvas = document.getElementById('gol');
    let gol = new Gol(40, 80, 10, targetCanvas);
    
    document.getElementById("startButton").addEventListener("click", function(){
        // setSize
        gol.init();
        gol.draw();
        gol.update();
        // setInterval(function() {update();}, 70);
    });

    document.getElementById("stopButton").addEventListener("click", function(){

    });

    
})();