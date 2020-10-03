Snap={
	sprites=[],
	Vec=function(x,y,z){
		this.x=x;
		this.y=y;
		this.z=z;
	},
	Sprite:function(costumes,sounds,events,pos,parent){
		let sprite={
			type:"sprite",
			events:events,
			sounds:sounds,
			costumes:costumes,
			parent:parent,
			load:function(x){
				let xhr=new XMLHttpRequest();
				xhr.open("GET",x,false);
				xhr.send();
				eval(xhr.responseText);
				ext(this);
			},
			pos:pos,
			costumeNum:0,
			costume:function(a){
				this.costumes.concat(a);
			},
			sound:function(a){
				this.sounds.concat(a);
			},
			update:function(){
				this.parent.canvas.getContext("2d").drawImage(this.costumes[this.costumeNum]);
			},
			getEvent:function(event){
				this.events[event.type](this,event);
			}
		};
		parent.sprites.push(sprite)
		return sprite;
	},
	Stage:function(canvas,backdrops){
		let stage={
			backdrops:backdrops,
			backdrop:function(a){
				this.backdrops.push(a);
			},
			backdropNum:0,
			canvas:canvas,
			sprites:[],
			update:function(){
				this.canvas.getContext("2d").drawImage(this.backdrops[this.backdropNum]);
				for(let i in this.sprites){
					this.sprites[i].update();
				}
			},
			event:function(params){
				params.preventDefault();
				for(let i in this.sprites){
					this.sprites[i].getEvent(params);
				}
			},
			setup:function(){
				addEventListener("*",this.event);
			}
		};
		return stage;
	}
}
