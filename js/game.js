import { Engine, Arcade, AnimationController, Acceleration, RigidBody, AssetManager, DisplayObject, Black, BlendMode, ColorHelper, ColorOverLife, Ease, Emitter, FloatScatter, FontStyle, FontWeight, GameObject, InitialLife, InitialVelocity, ScaleOverLife, Sprite, TextField, Tween } from 'black-engine';
import particle from 'assets/textures/particle.png';
import girl from 'assets/png/idle/1.png';

export class Game extends GameObject {
  constructor() {
    super();

    // Pick default AssetManager
    var assets = new AssetManager();

    assets.enqueueImage('bg', 'assets/bg.png');
    // load images, make sure to import them first
    assets.enqueueImage('girl', girl);
	
    // load font
    assets.enqueueGoogleFont('Titillium Web');

    // Listen for a complete message
    assets.on('complete', this.onAssetsLoadded, this);

    // Start preloading all enqueued assets
    assets.loadQueue();
  }

  onAssetsLoadded(m) {
    // Create a sprite
    let sprite = new Sprite('girl');
    sprite.alignPivot();
 
    sprite.x = this.stage.centerX;
    sprite.y = this.stage.centerY + 140;

    // make this game object touchable so children elements can be able to receive input too
    this.touchable = true;

    // sprite also needs to be touchable
    sprite.touchable = true;

    // Tween sprite color
    sprite.color = 0xffffff;
    sprite.add(new Tween({ scaleY: [0.96, 1, 1] }, 0.5, { delay: 0.1, loop: true, repeatDelay: 0 }));
  
    let textField = new TextField("Divy's Stupid Game v1.whocares", 'Titillium Web', 0xffffff, 15, FontStyle.NORMAL, FontWeight.BOLD);
    textField.highQuality = true;
    textField.x = this.stage.bounds.x;
    textField.y = this.stage.bounds.y;
    const body = new RigidBody();
    sprite.addComponent(body)
    sprite.rigidBody = sprite.getComponent(RigidBody);

    // Add sprite, text and emitter onto the stage
    this.add(sprite, textField);
    this.sprite = sprite;
    this.text = textField;

    this.stage.on('resize', this.onResize, this);
    Black.input.on('keyPress', this.onKeyPress, this);
  }
onKeyPress(msg, keyInfo) {
	   this.sprite.rigidBody.frictionAir = 0.05;
	if(keyInfo.keyCode == 39) {
	    console.info(this.sprite.rigidBody)
	 this.sprite.scaleX = this.sprite.rigidBody.velocityX > 1 ? 1 : this.sprite.rigidBody.velocityX < -1 ? -1 : this.sprite.scaleX;
	var tween = new Tween({ x: this.sprite.x+20 }, 0.2, { ease: Ease.linear })
	this.sprite.add(tween);
	}
	if(keyInfo.keyCode == 32 || keyInfo.keyCode == 38) {
	this.sprite.add(new Tween({ y: this.sprite.y-30 }, 0.4, { ease: Ease.linear }));
	}
	if(keyInfo.keyCode == 40) {
	this.sprite.add(new Tween({ y: this.sprite.y+30 }, 0.4, { ease: Ease.linear }));
	}
	if(keyInfo.keyCode == 40) {
	this.sprite.add(new Tween({ y: this.sprite.y+30 }, 0.4, { ease: Ease.linear }));
	}
	if(keyInfo.keyCode == 37) {
	this.sprite.add(new Tween({ x: this.sprite.x-30 }, 0.4, { ease: Ease.linear }));
	}
	
  }
  onResize() {
    this.text.x = this.stage.bounds.x;
    this.text.y = this.stage.bounds.y;
  }
}
