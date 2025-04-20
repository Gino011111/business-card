let cardGraphics;
let isRotating = false; // 是否正在旋轉
let rotationAngle = 0; // 當前旋轉角度
let targetRotation = 0; // 目標旋轉角度
let cardScale = 1; // 名片縮放比例

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL); // 使用 WEBGL 模式

  // 建立 2D 圖層來繪製文字
  cardGraphics = createGraphics(300, 150);
  cardGraphics.textAlign(CENTER, CENTER);
}

function draw() {
  background("#669bbc");

  // 設定光源
  ambientLight(150); // 環境光
  pointLight(255, 255, 255, mouseX - width / 2, mouseY - height / 2, 200); // 隨滑鼠移動的點光源

  // 處理旋轉動畫
  if (isRotating) {
    if (rotationAngle < targetRotation) {
      rotationAngle += 0.1; // 每次增加的旋轉角度
    } else {
      isRotating = false; // 停止旋轉
      rotationAngle = 0; // 重置角度
    }
  }

  // 3D 旋轉
  rotateY(rotationAngle + map(mouseX, 0, width, -PI / 6, PI / 6)); // 根據滑鼠 X 軸旋轉
  rotateX(map(mouseY, 0, height, -PI / 6, PI / 6)); // 根據滑鼠 Y 軸旋轉

  // 在 2D 圖層上繪製文字
  cardGraphics.background(255, 215, 0); // 金黃色背景
  cardGraphics.fill(0); // 黑色文字
  cardGraphics.textSize(18);
  cardGraphics.text("淡江大學 教育科技系", 150, 50); // 學校與系所
  cardGraphics.textSize(16);
  cardGraphics.text("姓名: 廖政瑜", 150, 80); // 姓名
  cardGraphics.textSize(14);
  cardGraphics.text("性別: 男", 150, 110); // 性別
  cardGraphics.text("生日: 95年1月11日", 150, 130); // 生日

  // 將 2D 圖層作為紋理貼到 3D 名片上
  push();
  translate(0, 0, 0); // 將名片放在螢幕正中間
  scale(cardScale); // 根據縮放比例調整名片大小
  texture(cardGraphics);
  noStroke();
  rectMode(CENTER);
  rect(0, 0, 300, 150);
  pop();
}

function doubleClicked() {
  if (!isRotating) {
    isRotating = true;
    targetRotation = TWO_PI * 3; // 設定旋轉 3 圈
  }
}

function mousePressed() {
  cardScale += 0.1; // 每次點擊放大 10%
}
