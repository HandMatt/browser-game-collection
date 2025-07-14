(function (lib, img, cjs) {
  var p; // shortcut to reference prototypes

  // library properties:
  lib.properties = {
    width: 550,
    height: 400,
    fps: 24,
    color: "#FFFFFF",
    manifest: [{ src: "../images/sushiA.png", id: "sushiA" }],
  };

  // stage content:
  (lib.assets = function () {
    this.initialize();

    // Layer 1
    this.instance = new lib.Bubble();
    this.instance.setTransform(272.3, 43.2, 1, 1, 0, 0, 0, -52.2, -27.7);

    this.instance_1 = new lib.Customer1();
    this.instance_1.setTransform(422.6, 283, 1, 1, 0, 0, 0, 61.9, 99.4);

    this.addChild(this.instance_1, this.instance);
  }).prototype = p = new cjs.Container();
  p.nominalBounds = new cjs.Rectangle(498.9, 220.2, 168.5, 163.7);

  // symbols:
  (lib.sushiA = function () {
    this.initialize(img.sushiA);
  }).prototype = p = new cjs.Bitmap();
  p.nominalBounds = new cjs.Rectangle(0, 0, 146, 137);

  (lib.SushiType = function (mode, startPosition, loop) {
    this.initialize(mode, startPosition, loop, {
      sushiOctopus: 3,
      sushiSalmonRoe: 2,
      sushiSalmon: 1,
      sushiEgg: 0,
    });

    // timeline functions:
    this.frame_0 = function () {
      stop();
    };

    // actions tween:
    this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(10));

    // assets
    this.text = new cjs.Text("SushiEgg", "bold 22px 'Arial'");
    this.text.lineHeight = 24;
    this.text.lineWidth = 121;
    this.text.setTransform(0, 0, 0.568, 0.568);

    this.timeline.addTween(
      cjs.Tween.get(this.text)
        .wait(1)
        .to({ x: -7.7, text: "SushiSalmon", lineWidth: 163 }, 0)
        .wait(1)
        .to({ text: "SalmonRoe" }, 0)
        .wait(1)
        .to({ x: 1.8, text: "Octopus" }, 0)
        .wait(7),
    );
  }).prototype = p = new cjs.MovieClip();
  p.nominalBounds = new cjs.Rectangle(0, 0, 70.9, 16.3);

  (lib.Customer1Normal = function () {
    this.initialize();

    // Layer 1
    this.shape = new cjs.Shape();
    this.shape.graphics.f().s("#231F20").p("AlqgiQDLBHCfgCQCNgCDehD");
    this.shape.setTransform(37.2, 68.5, 0.288, 0.288);

    this.shape_1 = new cjs.Shape();
    this.shape_1.graphics
      .f("#231F20")
      .s()
      .p(
        "AuAh8IkdB8IGLn4QgqgdgpgdQhRg7AJgDQAKgDHgg+IHeg8Ihxh1IK1DZIBVg8IBGCRIBqAUIg4BQIFyF2IjDgdIDDF6IhVgeIAeIwIhzgKIiQq8IsNhxIr7BxIiCL9IhaAXg",
      );
    this.shape_1.setTransform(34, 24.9, 0.288, 0.288);

    this.shape_2 = new cjs.Shape();
    this.shape_2.graphics.f("#231F20").s().p("Ag5A6IAAhzIBzAAIAABzg");
    this.shape_2.setTransform(47.6, 51.2, 0.288, 0.288);

    this.shape_3 = new cjs.Shape();
    this.shape_3.graphics.f().s("#231F20").p("ADjAAInFAA");
    this.shape_3.setTransform(52.5, 46.9, 0.288, 0.288);

    this.shape_4 = new cjs.Shape();
    this.shape_4.graphics.f("#231F20").s().p("Ag5A6IAAhzIBzAAIAABzg");
    this.shape_4.setTransform(26.7, 51.2, 0.288, 0.288);

    this.shape_5 = new cjs.Shape();
    this.shape_5.graphics.f().s("#231F20").p("AjiAAIHEAA");
    this.shape_5.setTransform(21.9, 46.9, 0.288, 0.288);

    this.shape_6 = new cjs.Shape();
    this.shape_6.graphics
      .f()
      .s("#231F20")
      .p(
        "ACHP6QhCAVhFAAQhDAAhCgVQi/g8i1iAQh3hUiqieQhHhDgVhfQhOllAZnPQAJiyAXiLQAUiBAUgdQAng5D/g2QERg4EsgCQEuACEQA4QD/A2AnA5QAUAdAVCBQAWCLAKCyQAYHPhOFlQgVBfhHBDQipCeh4BUQi0B/i/A9g",
      );
    this.shape_6.setTransform(37.2, 52.2, 0.288, 0.288);

    this.shape_7 = new cjs.Shape();
    this.shape_7.graphics
      .f("#FFFFFF")
      .s()
      .p(
        "AiFP6Qi/g8i1iAQh3hUiqieQhHhDgVhfQhOllAZnPQAJiyAXiLQAUiBAUgdQAng5D/g2QERg4EsgCQEuACEQA4QD/A2AnA5QAUAdAVCBQAWCLAKCyQAYHPhOFlQgVBfhHBDQipCeh4BUQi0B/i/A9QhCAVhFAAQhDAAhCgVg",
      );
    this.shape_7.setTransform(37.2, 52.2, 0.288, 0.288);

    this.shape_8 = new cjs.Shape();
    this.shape_8.graphics
      .f()
      .s("#231F20")
      .p("ABQAiQAAA9gsArQgpArg9AAIgNAAIAAlpIBZAAQAcAAAVAUQAVAVAAAdg");
    this.shape_8.setTransform(65.7, 52.2, 0.288, 0.288);

    this.shape_9 = new cjs.Shape();
    this.shape_9.graphics
      .f("#FFFFFF")
      .s()
      .p("AhOC1IAAlpIBYAAQAcAAAVAUQAUAVABAdIAACQQAAA9grArQgqArg9AAg");
    this.shape_9.setTransform(65.7, 52.2, 0.288, 0.288);

    this.shape_10 = new cjs.Shape();
    this.shape_10.graphics
      .f()
      .s("#231F20")
      .p("AhPAiQAAA9ArArQAqArA9AAIANAAIAAlpIhZAAQgcAAgVAUQgVAVAAAdg");
    this.shape_10.setTransform(8.5, 52.2, 0.288, 0.288);

    this.shape_11 = new cjs.Shape();
    this.shape_11.graphics
      .f("#FFFFFF")
      .s()
      .p("ABDC1Qg9AAgqgrQgrgrAAg9IAAiQQAAgdAVgVQAVgUAcAAIBZAAIAAFpg");
    this.shape_11.setTransform(8.5, 52.2, 0.288, 0.288);

    this.shape_12 = new cjs.Shape();
    this.shape_12.graphics.f().s("#231F20").p("AAoh6IhPAAIAAD1IBPAAg");
    this.shape_12.setTransform(36.7, 82.1, 0.288, 0.288);

    this.shape_13 = new cjs.Shape();
    this.shape_13.graphics.f("#FFFFFF").s().p("AgnB7IAAj1IBPAAIAAD1g");
    this.shape_13.setTransform(36.7, 82.1, 0.288, 0.288);

    this.shape_14 = new cjs.Shape();
    this.shape_14.graphics
      .f()
      .s("#231F20")
      .p(
        "Am8NrQgwAAggglQggglAHgwIDN1+QAOhfBIg+QBJhABfAAIC1AAQBfAABJBAQBIA+AOBfIDNV+QAEAXgHAWQgHAXgPARQgfAlgxAAg",
      );
    this.shape_14.setTransform(36.7, 110.8, 0.288, 0.288);

    this.shape_15 = new cjs.Shape();
    this.shape_15.graphics
      .f("#FFFFFF")
      .s()
      .p(
        "Am8NqQgwAAgggkQggglAHgwIDN1+QAOhfBIg+QBJg/BfAAIC1AAQBfAABJA/QBIA+AOBfIDNV+QAEAXgHAWQgHAXgPARQgfAkgxAAg",
      );
    this.shape_15.setTransform(36.7, 110.8, 0.288, 0.288);

    this.addChild(
      this.shape_15,
      this.shape_14,
      this.shape_13,
      this.shape_12,
      this.shape_11,
      this.shape_10,
      this.shape_9,
      this.shape_8,
      this.shape_7,
      this.shape_6,
      this.shape_5,
      this.shape_4,
      this.shape_3,
      this.shape_2,
      this.shape_1,
      this.shape,
    );
  }).prototype = p = new cjs.Container();
  p.nominalBounds = new cjs.Rectangle(0, 0, 69, 137);

  (lib.BubblePartC = function () {
    this.initialize();

    // Layer 1
    this.shape = new cjs.Shape();
    this.shape.graphics
      .f()
      .s("#000000")
      .ss(1, 1, 1)
      .p(
        "AAKAAQAAAEgDADQgDADgEAAQgDAAgDgDQgDgDAAgEQAAgDADgDQADgDADAAQAEAAADADQADADAAADg",
      );
    this.shape.setTransform(1.1, 1.1);

    this.shape_1 = new cjs.Shape();
    this.shape_1.graphics
      .f("#CCCCCC")
      .s()
      .p(
        "AgGAHQgDgDAAgEQAAgDADgDQADgDADAAQAEAAADADQADADAAADQAAAEgDADQgDADgEAAQgDAAgDgDg",
      );
    this.shape_1.setTransform(1.1, 1.1);

    this.addChild(this.shape_1, this.shape);
  }).prototype = p = new cjs.Container();
  p.nominalBounds = new cjs.Rectangle(-1, -1, 4.2, 4.2);

  (lib.BubblePartB = function () {
    this.initialize();

    // Layer 1
    this.shape = new cjs.Shape();
    this.shape.graphics
      .f()
      .s("#000000")
      .ss(1, 1, 1)
      .p(
        "AA8AAQAAAOgSALQgSAKgYAAQgXAAgSgKQgSgLAAgOQAAgNASgLQASgKAXAAQAYAAASAKQASALAAANg",
      );
    this.shape.setTransform(6, 3.6);

    this.shape_1 = new cjs.Shape();
    this.shape_1.graphics
      .f("#CCCCCC")
      .s()
      .p(
        "AgpAZQgSgLAAgOQAAgNASgLQASgKAXAAQAYAAASAKQASALAAANQAAAOgSALQgSAKgYAAQgXAAgSgKg",
      );
    this.shape_1.setTransform(6, 3.6);

    this.addChild(this.shape_1, this.shape);
  }).prototype = p = new cjs.Container();
  p.nominalBounds = new cjs.Rectangle(-1, -1, 14.1, 9.2);

  (lib.BubblePartA = function () {
    this.initialize();

    // Layer 1
    this.shape = new cjs.Shape();
    this.shape.graphics
      .f()
      .s("#000000")
      .ss(1, 1, 1)
      .p(
        "AGvAAQAABhh+BFQh+BFizAAQixAAh/hFQh+hFAAhhQAAhgB+hFQB/hFCxAAQCzAAB+BFQB+BFAABgg",
      );
    this.shape.setTransform(43.2, 23.6);

    this.shape_1 = new cjs.Shape();
    this.shape_1.graphics
      .f("#CCCCCC")
      .s()
      .p(
        "AkwCmQh+hFAAhhQAAhgB+hFQB/hFCxAAQCzAAB+BFQB+BFAABgQAABhh+BFQh+BFizAAQixAAh/hFg",
      );
    this.shape_1.setTransform(43.2, 23.6);

    this.addChild(this.shape_1, this.shape);
  }).prototype = p = new cjs.Container();
  p.nominalBounds = new cjs.Rectangle(-1, -1, 88.4, 49.1);

  (lib.AngrySymbol = function () {
    this.initialize();

    // Layer 1
    this.shape = new cjs.Shape();
    this.shape.graphics.f().s("#231F20").ss(1.3).p("AhogQICVg1IADgBIA1CU");
    this.shape.setTransform(-2.3, 4.4, 0.288, 0.288);

    this.shape_1 = new cjs.Shape();
    this.shape_1.graphics.f().s("#231F20").ss(1.3).p("ABpASIiVA0IgDABIg1iU");
    this.shape_1.setTransform(2.2, -4.4, 0.288, 0.288);

    this.shape_2 = new cjs.Shape();
    this.shape_2.graphics.f().s("#231F20").ss(1.3).p("ABQhjIiVA1IgEABIA1CU");
    this.shape_2.setTransform(4.2, 2.6, 0.288, 0.288);

    this.shape_3 = new cjs.Shape();
    this.shape_3.graphics.f().s("#231F20").ss(1.3).p("AhPBkICYg2Ig0iU");
    this.shape_3.setTransform(-4.3, -2.6, 0.288, 0.288);

    this.addChild(this.shape_3, this.shape_2, this.shape_1, this.shape);
  }).prototype = p = new cjs.Container();
  p.nominalBounds = new cjs.Rectangle(-7.5, -7.6, 15.1, 15.3);

  (lib.BubbleAnimation = function (mode, startPosition, loop) {
    this.initialize(mode, startPosition, loop, {});

    // Bubble Part C
    this.instance = new lib.BubblePartC();
    this.instance.setTransform(100.1, 50.1, 1, 1, 0, 0, 0, 1.1, 1.1);

    this.timeline.addTween(cjs.Tween.get(this.instance).wait(53));

    // Bubble Part B
    this.instance_1 = new lib.BubblePartB();
    this.instance_1.setTransform(88, 44.6, 1, 1, 0, 0, 0, 6, 3.6);

    this.timeline.addTween(
      cjs.Tween.get(this.instance_1)
        .to({ x: 85.8, y: 43.2 }, 14)
        .to({ x: 90.7, y: 44.8 }, 25)
        .to({ x: 88, y: 44.6 }, 13)
        .wait(1),
    );

    // Bubble Part A
    this.instance_2 = new lib.BubblePartA();
    this.instance_2.setTransform(43.1, 23.6, 1, 1, 0, 0, 0, 43.1, 23.6);

    this.timeline.addTween(
      cjs.Tween.get(this.instance_2)
        .to({ x: 39.6, y: 20.8 }, 14)
        .to({ x: 48.9, y: 24.8 }, 25)
        .to({ x: 43.1, y: 23.6 }, 13)
        .wait(1),
    );
  }).prototype = p = new cjs.MovieClip();
  p.nominalBounds = new cjs.Rectangle(-0.5, -0.5, 102.2, 52.1);

  (lib.Bubble = function () {
    this.initialize();

    // Layer 2
    this.sushiType = new lib.SushiType();
    this.sushiType.setTransform(-53.5, -27.1, 1, 1, 0, 0, 0, 35.5, 8.1);

    // Layer 1
    this.instance = new lib.BubbleAnimation();
    this.instance.setTransform(-49.5, -24.5, 1, 1, 0, 0, 0, 50.6, 25.6);

    this.addChild(this.instance, this.sushiType);
  }).prototype = p = new cjs.Container();
  p.nominalBounds = new cjs.Rectangle(-100.6, -50.6, 102.1, 52.1);

  (lib.AngrySymbalAnimation = function (mode, startPosition, loop) {
    this.initialize(mode, startPosition, loop, {});

    // Layer 1
    this.instance = new lib.AngrySymbol();

    this.timeline.addTween(
      cjs.Tween.get(this.instance)
        .to({ scaleX: 1.38, scaleY: 1.38 }, 7)
        .to({ scaleX: 1, scaleY: 1 }, 7)
        .wait(1),
    );
  }).prototype = p = new cjs.MovieClip();
  p.nominalBounds = new cjs.Rectangle(-7.2, -7.3, 14.4, 14.6);

  (lib.Customer1Angry = function () {
    this.initialize();

    // Layer 1
    this.instance = new lib.AngrySymbalAnimation();
    this.instance.setTransform(55.2, 34.4);

    this.shape = new cjs.Shape();
    this.shape.graphics
      .f()
      .s("#231F20")
      .p("AlrA3QAAgyBygcQBmgaCTAAQCTAABnAaQByAcAAAy");
    this.shape.setTransform(37.1, 68.5, 0.288, 0.288);

    this.shape_1 = new cjs.Shape();
    this.shape_1.graphics
      .f("#231F20")
      .s()
      .p(
        "AuAh8IkdB8IGLn4QgqgdgpgdQhRg7AJgDQAJgDHig+IHdg8Ihxh1IK1DZIBVg8IBGCRIBqAUIg4BQIFyF2IjDgdIDDF6IhVgeIAeIwIhzgKIiQq8IsNhxIr7BxIiCL9IhaAXg",
      );
    this.shape_1.setTransform(34, 24.9, 0.288, 0.288);

    this.shape_2 = new cjs.Shape();
    this.shape_2.graphics.f("#231F20").s().p("Ag5A6IAAhzIBzAAIAABzg");
    this.shape_2.setTransform(47.6, 51.2, 0.288, 0.288);

    this.shape_3 = new cjs.Shape();
    this.shape_3.graphics.f().s("#231F20").p("ADjAAInEAA");
    this.shape_3.setTransform(52.4, 47, 0.288, 0.288);

    this.shape_4 = new cjs.Shape();
    this.shape_4.graphics.f("#231F20").s().p("Ag5A6IAAhzIBzAAIAABzg");
    this.shape_4.setTransform(26.7, 51.2, 0.288, 0.288);

    this.shape_5 = new cjs.Shape();
    this.shape_5.graphics.f().s("#231F20").p("AjiAAIHFAA");
    this.shape_5.setTransform(21.8, 47, 0.288, 0.288);

    this.shape_6 = new cjs.Shape();
    this.shape_6.graphics
      .f()
      .s("#231F20")
      .p(
        "ACHP6QhBAVhGAAQhEAAhCgVQi+g8i1iAQh3hTiqifQhHhCgWhgQhNllAYnPQAKiyAWiLQAViBAUgdQAng5D/g2QEQg4EtgCQEtACERA4QD/A2AnA5QAUAdAVCBQAWCLAKCyQAYHPhOFlQgUBfhHBDQiqCeh4BUQi0B/i/A9g",
      );
    this.shape_6.setTransform(37.1, 52.2, 0.288, 0.288);

    this.shape_7 = new cjs.Shape();
    this.shape_7.graphics
      .f("#FFFFFF")
      .s()
      .p(
        "AiFP6Qi/g8i0iAQh3hTirifQhGhCgXhgQhNllAYnPQAKiyAWiLQAViBAUgdQAng5D/g2QERg4EsgCQEtACERA4QD/A2AnA5QAUAdAVCBQAWCLAKCyQAYHPhNFlQgVBfhIBDQipCeh4BUQi0B/i/A9QhCAVhFAAQhEAAhBgVg",
      );
    this.shape_7.setTransform(37.1, 52.2, 0.288, 0.288);

    this.shape_8 = new cjs.Shape();
    this.shape_8.graphics
      .f()
      .s("#231F20")
      .p("ABQAiQAAA9gsArQgpArg9AAIgNAAIAAlpIBZAAQAdAAAUAUQAVAVAAAdg");
    this.shape_8.setTransform(65.7, 52.2, 0.288, 0.288);

    this.shape_9 = new cjs.Shape();
    this.shape_9.graphics
      .f("#FFFFFF")
      .s()
      .p("AhPC1IAAlpIBZAAQAcAAAVAUQAVAVAAAdIAACQQgBA9grArQgpArg9AAg");
    this.shape_9.setTransform(65.7, 52.2, 0.288, 0.288);

    this.shape_10 = new cjs.Shape();
    this.shape_10.graphics
      .f()
      .s("#231F20")
      .p("AhOAiQAAA9ArArQApArA9AAIANAAIAAlpIhYAAQgdAAgVAUQgUAVAAAdg");
    this.shape_10.setTransform(8.5, 52.2, 0.288, 0.288);

    this.shape_11 = new cjs.Shape();
    this.shape_11.graphics
      .f("#FFFFFF")
      .s()
      .p("ABDC1Qg9AAgqgrQgrgrAAg9IAAiQQABgdAUgVQAVgUAcAAIBYAAIAAFpg");
    this.shape_11.setTransform(8.5, 52.2, 0.288, 0.288);

    this.shape_12 = new cjs.Shape();
    this.shape_12.graphics.f().s("#231F20").p("AAoh6IhPAAIAAD1IBPAAg");
    this.shape_12.setTransform(36.7, 82.1, 0.288, 0.288);

    this.shape_13 = new cjs.Shape();
    this.shape_13.graphics.f("#FFFFFF").s().p("AgnB7IAAj1IBPAAIAAD1g");
    this.shape_13.setTransform(36.7, 82.1, 0.288, 0.288);

    this.shape_14 = new cjs.Shape();
    this.shape_14.graphics
      .f()
      .s("#231F20")
      .p(
        "Am8NrQgXAAgVgKQgVgJgPgSQgQgRgGgXQgHgWAEgXIDN1+QAOhfBIg+QBIhABgAAIC1AAQBgAABIBAQBIA+AOBfIDNV+QADAXgGAWQgGAXgQARQgPASgVAJQgVAKgYAAg",
      );
    this.shape_14.setTransform(36.7, 110.8, 0.288, 0.288);

    this.shape_15 = new cjs.Shape();
    this.shape_15.graphics
      .f("#FFFFFF")
      .s()
      .p(
        "Am8NrQgXAAgVgKQgVgKgPgRQgQgSgGgWQgHgWAEgXIDN1+QAOhfBIg/QBJg/BgAAIC0AAQBgAABIA/QBIA/AOBfIDNV+QAEAXgHAWQgGAWgQASQgPARgVAKQgVAKgYAAg",
      );
    this.shape_15.setTransform(36.7, 110.8, 0.288, 0.288);

    this.addChild(
      this.shape_15,
      this.shape_14,
      this.shape_13,
      this.shape_12,
      this.shape_11,
      this.shape_10,
      this.shape_9,
      this.shape_8,
      this.shape_7,
      this.shape_6,
      this.shape_5,
      this.shape_4,
      this.shape_3,
      this.shape_2,
      this.shape_1,
      this.shape,
      this.instance,
    );
  }).prototype = p = new cjs.Container();
  p.nominalBounds = new cjs.Rectangle(0, 0, 69, 137);

  (lib.Customer1 = function (mode, startPosition, loop) {
    this.initialize(mode, startPosition, loop, { angry: 1, normal: 0 });

    // timeline functions:
    this.frame_0 = function () {
      stop();
    };

    // actions tween:
    this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(2));

    // Layer 3
    this.instance = new lib.Customer1Normal();
    this.instance.setTransform(-2.5, -68, 1, 1, 0, 0, 0, 34.2, 68.2);

    this.instance_1 = new lib.Customer1Angry();
    this.instance_1.setTransform(-2.5, -68, 1, 1, 0, 0, 0, 34.2, 68.2);

    this.timeline.addTween(
      cjs.Tween.get({})
        .to({ state: [{ t: this.instance }] })
        .to({ state: [{ t: this.instance_1 }] }, 1)
        .wait(1),
    );
  }).prototype = p = new cjs.MovieClip();
  p.nominalBounds = new cjs.Rectangle(-36.7, -136.2, 68.5, 136.5);
})((lib = lib || {}), (images = images || {}), (createjs = createjs || {}));
var lib, images, createjs;
