var div = document.getElementById('div1');
var divnext = document.getElementById('xiayige');
var score1 = document.getElementById('score');
var a = 1000;
var ditu = {
	data : [
	[3,0,0,0,0,0,0,0,0,0,0,3],
	[3,0,0,0,0,0,0,0,0,0,0,3],
	[3,0,0,0,0,0,0,0,0,0,0,3],
	[3,0,0,0,0,0,0,0,0,0,0,3],
	[3,0,0,0,0,0,0,0,0,0,0,3],
	[3,0,0,0,0,0,0,0,0,0,0,3],
	[3,0,0,0,0,0,0,0,0,0,0,3],
	[3,0,0,0,0,0,0,0,0,0,0,3],
	[3,0,0,0,0,0,0,0,0,0,0,3],
	[3,0,0,0,0,0,0,0,0,0,0,3],
	[3,0,0,0,0,0,0,0,0,0,0,3],
	[3,0,0,0,0,0,0,0,0,0,0,3],
	[3,0,0,0,0,0,0,0,0,0,0,3],
	[3,0,0,0,0,0,0,0,0,0,0,3],
	[3,0,0,0,0,0,0,0,0,0,0,3],
	[3,0,0,0,0,0,0,0,0,0,0,3],
	[3,0,0,0,0,0,0,0,0,0,0,3],
	[3,3,3,3,3,3,3,3,3,3,3,3],
	[3,3,3,3,3,3,3,3,3,3,3,3]
	],
	nextshape : [ //右侧预图形的地图二维数组
	[0,0,0,0,0],
	[0,0,0,0,0],
	[0,0,0,0,0],
	[0,0,0,0,0],
	],
	newshapei : [],//i代表运动中图形纵坐标 n代表横坐标 每个方格的坐标为 newshapei[i],newshapen[i]
	newshapen : [],
	arr3 : [],//存储图形规格所代表的数字（3种规格 九宫格1 方块0 竖条2）
	arr4 : [1,3],//图形的中心环绕块 初始位置[1,3]
	// arr5 :[],
	shapeabc:null, //存储的为右侧提示的下次会出现的图形二维数组
	shapenum : null,//图形规格分类 0-4为九宫格 绕中心点360度旋转 5为方块 不可旋转,6为竖条形，绕中心点90度旋转
	
	shape : function(){//随机生成新图形
		var shapea = [[1,3],[1,2],[0,3],[1,4]];
		var shapeb = [[1,3],[0,2],[1,2],[1,4]];
		var shapec = [[1,3],[1,2],[0,4],[1,4]];
		var shaped = [[1,3],[0,4],[1,2],[0,3]];
		var shapee = [[1,3],[0,3],[0,2],[1,4]];
		var shapef = [[1,3],[0,3],[0,4],[1,4]];
		var shapeg = [[1,3],[0,3],[2,3],[3,3]];
		var shape = [];
		shape[0] = shapea;
		shape[1] = shapeb;
		shape[2] = shapec;
		shape[3] = shaped;
		shape[4] = shapee;
		shape[5] = shapef;
		shape[6] = shapeg;
		var a = Math.floor(Math.random()*7)
		
		if(a>=0&&a<5){
			this.shapenum = 1
		}else if(a == 6){
			this.shapenum = 2
			
		}else if(a == 5){
			this.shapenum = 0
		}
		this.arr3.push(this.shapenum)
		// }else {
		// 	this.arr5.push(shape[a][0][0])
		// 	this.arr5.push(shape[a][0][1])
		// }
		
		
		// console.log(this.arr4)
		return shape[a];


	},
	score : 0,
	arr : [],//值为当前移动的图形4个小方格Y坐标+1方格内的数字，目的为了判断是否下方为边界位置（0为空 1为移动方格 2为固定方格 3为边界）
	arrlr : [],//与arr相同  保存的是X坐标+1或-1方格内的数字（4个数字）
	barr : [],
	speed : 1000,
	lr : 0,
	start1 : 1,
	keyOnOff : 1,
	newgame : 0,//控制文字显示 为重新开始or暂停 
	stop : function(){
		var div1 = document.getElementById('stop');
		div1.className ='stop';

	},
	start : function(){
		var div1 = document.getElementById('stop');
		div1.className ='start';
		
	},
	rotate : function(){var arr1 = [];var arr2 = [];
					var shapenum1 = this.arr3[0]
					
			 	if(shapenum1 == 2){
			 		var a = this.arr4[0];
			 		var b = this.arr4[1];//下方判断可否把!=2&&!=3改为==0
			 		if(this.data[a-1][b-1] !=2&&this.data[a-1][b] != 2&&this.data[a-1][b+1] != 2&&this.data[a][b-1] != 2&&this.data[a][b+1] != 2&&this.data[a+1][b-1] != 2&&this.data[a+1][b] != 2&&this.data[a+1][b+1] != 2&&this.data[a-1][b+2] != 2&&this.data[a][b+2] != 2&&this.data[a+1][b+2] != 2&&this.data[a+2][b+2] != 2&&this.data[a+2][b+1] != 2&&this.data[a+2][b] != 2&&this.data[a+2][b-1] != 2&&this.data[a-1][b-1] !=3&&this.data[a-1][b] != 3&&this.data[a-1][b+1] != 3&&this.data[a][b-1] != 3&&this.data[a][b+1] != 3&&this.data[a+1][b-1] != 3&&this.data[a+1][b] != 3&&this.data[a+1][b+1] != 3&&this.data[a+2][b] != 3&&this.data[a][b+2] != 3){//判断竖条所占据的12个格每个格是否都不为2和3
				 		if(this.data[a-1][b] == 1){//判断所占据的处中心方块外6个格当前所在位置（是否为1）
							this.data[a-1][b] = 0  //记录下位置坐标 并把坐标设置为0
							arr1.push(a-1)
							arr2.push(b)
						};
						
						if(this.data[a][b-1] == 1){
							this.data[a][b-1] = 0
							arr1.push(a)
							arr2.push(b-1)
						};
						if(this.data[a][b+1] == 1){
							this.data[a][b+1] = 0
							arr1.push(a)
							arr2.push(b+1)
						};
						
						if(this.data[a+1][b] == 1){
							this.data[a+1][b] = 0
							arr1.push(a+1)
							arr2.push(b)
						};
						
						if(this.data[a+2][b] == 1){
							this.data[a+2][b] = 0
							arr1.push(a+2)
							arr2.push(b)
						};
						if(this.data[a][b+2] == 1){
							this.data[a][b+2] = 0
							arr1.push(a)
							arr2.push(b+2)
						};
				
	// if(this.data[a+1][])	
						for(var i = 0;i<arr1.length;i++){//判断之前存的数为1的坐标所在位置 当旋转时该变到什么具体位置
						
							if(arr1[i] < a&&arr2[i] == b){
								this.data[a][b+1] = 1
							}
							
							if(arr1[i] == a&&arr2[i] < b){
								this.data[a-1][b] = 1
							}
							if(arr1[i] == a&&arr2[i] >b){
								this.data[a+1][b] = 1
							}
							
							if(arr1[i] > a&&arr2[i] == b){
								this.data[a][b-1] = 1
							}
							
							if(arr1[i] == (a+2)&&arr2[i] == b){
								this.data[a][b+2] = 1
							}
							if(arr1[i] == a&&arr2[i] == (b+2)){
								this.data[a+2][b] = 1
							}
						}
					}
					}else if(shapenum1 == 1){
					var a = this.arr4[0];
			 		var b = this.arr4[1];
				// console.log(this.arr4)
					
				if(this.data[a-1][b-1] !=2&&this.data[a-1][b] != 2&&this.data[a-1][b+1] != 2&&this.data[a][b-1] != 2&&this.data[a][b+1] != 2&&this.data[a+1][b-1] != 2&&this.data[a+1][b] != 2&&this.data[a+1][b+1] != 2&&this.data[a-1][b-1] !=3&&this.data[a-1][b] != 3&&this.data[a-1][b+1] != 3&&this.data[a][b-1] != 3&&this.data[a][b+1] != 3&&this.data[a+1][b-1] != 3&&this.data[a+1][b] != 3&&this.data[a+1][b+1] != 3){//逻辑与上边竖条的相同 


	
					if(this.data[a-1][b-1] == 1){//不能与下边合并 因为有顺序问题 变过位置的方块会再次变位置
						this.data[a-1][b-1] = 0
						arr1.push(a-1)
						arr2.push(b-1)
					};
					if(this.data[a-1][b] == 1){
						this.data[a-1][b] = 0
						arr1.push(a-1)
						arr2.push(b)
					};
					if(this.data[a-1][b+1] == 1){
						this.data[a-1][b+1] = 0
						arr1.push(a-1)
						arr2.push(b+1)
					};
					if(this.data[a][b-1] == 1){
						this.data[a][b-1] = 0
						arr1.push(a)
						arr2.push(b-1)
					};
					if(this.data[a][b+1] == 1){
						this.data[a][b+1] = 0
						arr1.push(a)
						arr2.push(b+1)
					};
					if(this.data[a+1][b-1] == 1){
						this.data[a+1][b-1] = 0
						arr1.push(a+1)
						arr2.push(b-1)
					};
					if(this.data[a+1][b] == 1){
						this.data[a+1][b] = 0
						arr1.push(a+1)
						arr2.push(b)
					};
					if(this.data[a+1][b+1] == 1){
						this.data[a+1][b+1] = 0
						arr1.push(a+1)
						arr2.push(b+1)
					};
					
				
	// if(this.data[a+1][])	
					for(var i = 0;i<arr1.length;i++){
						if(arr1[i] < a&&arr2[i] < b){
							this.data[a-1][b+1] = 1
						}
						if(arr1[i] < a&&arr2[i] == b){
							this.data[a][b+1] = 1
						}
						if(arr1[i] < a&&arr2[i] > b){
							this.data[a+1][b+1] = 1
						}
						if(arr1[i] == a&&arr2[i] < b){
							this.data[a-1][b] = 1
						}
						if(arr1[i] == a&&arr2[i] == b+1){
							this.data[a+1][b] = 1
						}
						if(arr1[i] > a&&arr2[i] < b){
							this.data[a-1][b-1] = 1
						}
						if(arr1[i] == a+1&&arr2[i] == b){
							this.data[a][b-1] = 1
						}
						if(arr1[i] > a&&arr2[i] > b){
							this.data[a+1][b-1] = 1
						}
						
					}
				}
			}
		},
	
	newShapea : function(){ //与newShapeb配合 此方法为提前创建下一个下落图形
		var shape1 = this.shape()
		this.shapeabc = shape1
		
		for(var i = 0; i < 4; i++){

			this.nextshape[shape1[i][0]][shape1[i][1]] = 1;
			
		}
		
	},
	newShapeb : function(){
		var shape2 = this.shapeabc  //优先于newShapea执行 图形为上一次newShapea创造出的
		for(var i = 0; i < 4; i++){
			if(this.data[shape2[i][0]][shape2[i][1]] == 2){//如果新图形有一个方框内为2游戏结束
				 this.gameover()
		;
				
			}else{
				this.data[shape2[i][0]][shape2[i][1]] = 1;
			}
		}
		
		
	},
	gameover : function(){
		this.stop();
		var p1 = document.getElementById('kai');
		var p2 = document.getElementById('kai2');
		p1.innerHTML = "game Over";

		p2.innerHTML = "按space重新开始";
		this.keyOnOff = 0;
		clearInterval(timer);
		this.newgame = 1

		
	},
	newdiv : function(){var a = 0;//动态插入背景小方格，创建游戏地图 ID与数组坐标相匹配
			var b = 0;
			for(var i = 0; i < this.data.length; i++){
				for(var n = 0; n < this.data[0].length; n++){
					if(i<10){
						a = '0'+i;
					}else{
						a = i;
					}
					if(n<10){
						b = '0'+n;
					}else{
						b = n;
					}
					var div1 = document.createElement('div');
					div1.id = 'd' + a + b;
					div1.className = 'd1';
					div.appendChild(div1);

				}
			}
		},
	newdiv2 : function(){ //动态创建预图形（右侧方格）的背景小方格
			for(var i = 0; i < this.nextshape.length; i++){
				for(var n = 0; n < this.nextshape[0].length; n++){
					var div1 = document.createElement('div');
					div1.id = 'c' + i + n;
					div1.className = 'd1';
					divnext.appendChild(div1);

				}
			}
		},
	color2 : function(){//为右侧预图形上色
			for(var i = 0; i < this.nextshape.length; i++){
				for(var n = 0; n < this.nextshape[0].length; n++){
					var id = 'c' + i + n;
					if(this.nextshape[i][n] == 1){
						document.getElementById(id).style.background = 'red';
					}else{
						document.getElementById(id).style.background = '';
					}
				}
			}
		},	
	color : function(){//为游戏区域移动和固定的小方格上色（1,2,4） 边界3为黑色
					var a = 0 ;
					var b = 0;
			for(var i = 0; i < this.data.length; i++){
				for(var n = 0; n < this.data[0].length; n++){

					if(i<10){
						a = '0'+i;
					}else{
						a = i;
					}
					if(n<10){
						b = '0'+n;
					}else{
						b = n;
					}
					var id = 'd' + a + b;
					if(this.data[i][n] == 1||this.data[i][n] == 2||this.data[i][n] == 4){
						document.getElementById(id).style.background = 'red';
					}else if(this.data[i][n] == 3){
						document.getElementById(id).style.background = 'black';
						document.getElementById(id).style.border = '1px solid black';

					}else{
						document.getElementById(id).style.background = '';
					}

				}
			}
		},
		
	index1 :function(){//可否不做If判断  为何要反向？
						//存储当前移动中图形的坐标的方法
			for(var i = this.data.length-1; i >= 0; i--){
				for(var n = this.data[0].length-1; n >= 0; n--){
					if(this.data[i][n] == 1 ){
						this.data[i][n] = 0;
						this.newshapei.push(i);
						this.newshapen.push(n);
						
					};
				};
			};
	},
	moveDown : function(){ //下移
			this.index1()
			if(this.newshapei.length){//可否删掉判断？ 在刚好页面全消除时是否会报错？
				this.arr4[0]++			//图形环绕块纵坐标加一
				// console.log(this.arr4)
			}
			
			this.speed = 1000
			for(var i = 0; i < this.newshapei.length; i++){	//可否和下边的循环合并？
				var a = this.newshapei[i];
				var b = this.newshapen[i];
				// console.log(this.newshapei);
				// console.log(this.newshapen);	
				this.arr.push(this.data[a+1][b]) //将即将接触到的下一排相邻的4个小方格坐标保存（横坐标相同）


			}
				
			for(var i = 0; i <this.newshapei.length; i++){	
				var a = this.newshapei[i];
				var b = this.newshapen[i];
				this.move(a,b,a+1,b)
			}
				
				this.newshapei = [];
				this.newshapen = [];
				this.arr = [];
				this.remove()
				this.createNewShape()

				
				
				
				
		},
	
	// moveLeft : function(){
	// 		this.index1()
	// 		for(var i = 0; i < this.newshapei.length; i++){	
	// 			var a = this.newshapei[i];
	// 			var b = this.newshapen[i];
	// 			this.arrlr.push(this.data[a][b-1])
	// 		}
	// 		for(var i = 0; i <this.newshapei.length; i++){	
	// 			var a = this.newshapei[i];
	// 			var b = this.newshapen[i];
	// 			this.movelr(a,b,a,b-1)

	// 		}
	// 		if(this.lr){
	// 			this.arr4[1]--;//判断是否要移动中心方块位置
	// 		}
				
				
			
				
	// 			this.arrlr = [];
	// 			this.newshapei = [];
	// 			this.newshapen = [];
	// },
	moveLeri : function(leri){//把左右方法合并到一起  上边为向左 下边为向右
			this.index1()
			for(var i = 0; i < this.newshapei.length; i++){	
				var a = this.newshapei[i];
				var b = this.newshapen[i];
				
				leri == "left" ? this.arrlr.push(this.data[a][b-1]) : this.arrlr.push(this.data[a][b+1])
			}
			for(var i = 0; i <this.newshapei.length; i++){	
				var a = this.newshapei[i];
				var b = this.newshapen[i];
				leri == "left" ? this.movelr(a,b,a,b-1) : this.movelr(a,b,a,b+1)

			}
			if(this.lr){
				leri == "left" ? this.arr4[1]-- : this.arr4[1]++;
				//判断是否要移动中心方块位置
			}
				
				
			
				
				this.arrlr = [];
				this.newshapei = [];
				this.newshapen = [];
	},
	// moveRight: function(){
	// 		this.index1()
	// 		for(var i = 0; i < this.newshapei.length; i++){	
	// 			var a = this.newshapei[i];
	// 			var b = this.newshapen[i];
	// 			this.arrlr.push(this.data[a][b+1])
	// 		}
	// 		for(var i = 0; i <this.newshapei.length; i++){	
	// 			var a = this.newshapei[i];
	// 			var b = this.newshapen[i];
	// 			this.movelr(a,b,a,b+1)

	// 		}
	// 		if(this.lr){
				
	// 				this.arr4[1]++
				
					
				
	// 		}
	// 			this.arrlr = [];
	// 			this.newshapei = [];
	// 			this.newshapen = [];
	// },
	movelr:function(a,b,nexta,nextb){//左右移动需要判断的逻辑
		if (this.arrlr.every(function(item){
			return item != 2&&item !=3
		})){
			this.data[nexta][nextb] = 1
			this.lr = 1
		}else{
			this.data[a][b] = 1
			this.lr = 0
		}
		this.color()
	},
	move : function(a,b,nexta,nextb){ //下移需要判断的逻辑
		if(this.arr.every(function(item){ //如果下方即将接触的方格内值为0 就可以继续下落


			return item != 2&&item != 3
			})){
				this.data[nexta][nextb] = 1
				
			}else{	
				
				this.data[a][b] = 2;
				console.log(this.arr3);
				if(this.arr3.length >1){ 
					this.arr3.shift(this.arr3[0])
					this.arr4 = [1,3]
				}
		// console.log(this.score)
				
			}

	},
	createNewShape : function(){//创建新图形
		if(this.data.every(function(item){
				return item.every(function(item1){
					return item1!==1//没有移动中的图形则创建新图形
					 	})
			})){
			for(var i = 0; i<this.nextshape.length; i++){
					for (var n = 0; n<this.nextshape[0].length;n++) {
						this.nextshape[i][n] = 0
					};
				}
				this.newShapeb()

				this.newShapea()
				this.color2()
			}
	},
	chushihua : function(){
		this.data =[
	[3,0,0,0,0,0,0,0,0,0,0,3],
	[3,0,0,0,0,0,0,0,0,0,0,3],
	[3,0,0,0,0,0,0,0,0,0,0,3],
	[3,0,0,0,0,0,0,0,0,0,0,3],
	[3,0,0,0,0,0,0,0,0,0,0,3],
	[3,0,0,0,0,0,0,0,0,0,0,3],
	[3,0,0,0,0,0,0,0,0,0,0,3],
	[3,0,0,0,0,0,0,0,0,0,0,3],
	[3,0,0,0,0,0,0,0,0,0,0,3],
	[3,0,0,0,0,0,0,0,0,0,0,3],
	[3,0,0,0,0,0,0,0,0,0,0,3],
	[3,0,0,0,0,0,0,0,0,0,0,3],
	[3,0,0,0,0,0,0,0,0,0,0,3],
	[3,0,0,0,0,0,0,0,0,0,0,3],
	[3,0,0,0,0,0,0,0,0,0,0,3],
	[3,0,0,0,0,0,0,0,0,0,0,3],
	[3,0,0,0,0,0,0,0,0,0,0,3],
	[3,3,3,3,3,3,3,3,3,3,3,3],
	[3,3,3,3,3,3,3,3,3,3,3,3]
	];
	this.nextshape = [
	[0,0,0,0,0],
	[0,0,0,0,0],
	[0,0,0,0,0],
	[0,0,0,0,0],
	];
	this.newShapea()
	// ditu.newShapeb()
	this.color2()

	this.color()
	},
	remove : function(){//删除整行
		var arr = [];
		var arr2 = [];
		var c = 0;
		for(var i = this.data.length-1; i>=0;i--){
			arr = this.data[i].slice(1,this.data[0].length-1);
			if(arr.every(function(item){	//	如果一行都满 就把次行索引加入arr2 并把此行每项值都变为0
				return item == 2
			})){
				arr2.push(i)
				for(var n = this.data[0].length-2;n>=1;n--){
					this.data[i][n] = 0;
				}
			}		
		}	
		if(arr2.length){//反向循环作用从下向上检查需要消除的目标 
						//可以先清除再把消除行以上的停止方块（2）逐个下落
						//正向循环需要多余步骤来使消除行上方停止方块（2）下落
			
			for (var j = arr2.length-1; j>=0 ;j--){
				for(var i = arr2[j]; i>=0; i--){
					for(var n = this.data[0].length-1; n>=0; n--){
			 			if(this.data[i][n] == 2){
			 		 		this.data[i][n] = 0
			 	 			this.data[i+1][n] = 2
			 	 			this.color()
			 	 		}
			 		}         
			 	}
			}
		if(arr2.length == 1){
			this.score+=100
		}else if(arr2.length == 2){
			this.score+=300
		}else if(arr2.length == 3){
			this.score+=500
		}else if(arr2.length == 4){
			this.score+=800
		}
		score1.innerHTML = "score:"+this.score
		
			arr2 = [];
		}
	

	}
	
}
	
	
	                                                                                                                                                                                                                                                                                                                                 
	ditu.newdiv()
	ditu.newdiv2()
	// 	var timer =	setInterval(function(){
	// ditu.color()
	// ditu.moveDown()
	
	// },ditu.speed)

		ditu.chushihua()
	var close = 1; 
	
	
	document.onkeydown=function(){
		 var event=window.event||arguments[0];

		 var code=event.keyCode;
		 
		if(code===32){
			event.preventDefault();
			var p1 = document.getElementById('kai');
			var p2 = document.getElementById('kai1');
			p1.innerHTML = '游戏暂停'
			if(ditu.newgame){
				ditu.chushihua();
				 ditu.newgame = 0;
				p2.innerHTML = "按space暂停"
				ditu.start1 = 0
				ditu.start();
				ditu.keyOnOff = 1;
				timer = setInterval(function(){

				ditu.color()
				ditu.moveDown();
				
				},ditu.speed)
				
			}else{
			if(ditu.start1){
				p2.innerHTML = "按space暂停"
				ditu.start1 = 0
				ditu.start();
				ditu.keyOnOff = 1;
				timer  = setInterval(function(){
				ditu.color()
				ditu.moveDown();

			},ditu.speed)
				
			}else{
				ditu.start1 = 1
				p2.innerHTML = "按space开始"
				ditu.stop()
				clearInterval(timer)
				ditu.keyOnOff = 0;
				
			}
			}
		}
		if(ditu.keyOnOff){
		if(code===37){
			ditu.moveLeri("left");
			
		};
		if (code===38) {
			
				event.preventDefault();
			
			ditu.rotate();
			ditu.color();
		};
		if(code===39){
			ditu.moveLeri("right");
			
		};
		if(code===40){
			ditu.speed = 100;
			event.preventDefault();
			if (close) {
				close = 0
			 clearInterval(timer)
			timer  = setInterval(function(){
				ditu.color()
				ditu.moveDown();
	
			},ditu.speed)
			 };
		
		}
		}
}
	document.onkeyup=function(){

				var event=window.event||arguments[0];
				var code=event.keyCode;
				if(ditu.keyOnOff){
				if(code===40){
					close = 1;
					ditu.speed =1000;
					clearInterval(timer)
			 timer = setInterval(function(){
				ditu.color()
				ditu.moveDown();
	
			},ditu.speed)
			}
				}
			
		
	}