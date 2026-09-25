---
# 页面基础配置（Fluid主题必选）
title: 关于  # 页面标题，会显示在导航栏和页面顶部
layout: page  # 固定为page布局，适配Fluid主题
permalink: /about/  # 页面访问路径（无需修改）
date: 2025-12-15 09:47:33
---

<!-- 1. 头像区域：适配Fluid简约风格，圆形头像+居中排版 -->
<!-- 提示：将你的头像图片命名为avatar.jpg，放在source/images/目录下（没有images目录就新建一个） -->
<div align="center">
  <img 
    src="images/KTDF.jpg"        
    alt="我的头像" 
    width="200"  
    class="rounded-circle mb-4"
  />
</div>

<!-- 2. 个人基础信息：昵称+简介，居中柔和排版 -->
<div align="center">
  <h1>KTDF</h1>  <!-- 修改为你的昵称 -->
  <p class="text-muted" style="font-size: 1.2rem; max-width: 600px; margin: 0 auto;">
    一名热爱技术与生活的博主，专注于二进制安全和一些有趣的开发，
    在这里记录成长、分享思考与感悟，期待和你一起进步～
  </p>  <!-- 修改为你的个人简介 -->
</div>

<!-- 3. 详细信息卡片：整合个人资料，适配Fluid卡片风格 -->
<div class="card mt-5" style="max-width: 800px; margin: 0 auto;">
  <div class="card-body">
    <h5 class="card-title">个人资料</h5>
    <ul class="list-unstyled">
      <li class="mb-2"><strong>昵称：</strong> K头的扉</li>  <!-- 修改 -->
      <li class="mb-2"><strong>邮箱：</strong> <a href="mailto:3268280485@qq.com">3268280485@qq.com</a></li>  <!-- 修改邮箱 -->
      <li class="mb-2"><strong>GitHub：</strong> <a href="https://github.com/KTDF-1" target="_blank">https://github.com/KTDF-1</a></li>  <!-- GitHub地址 -->
      <li class="mb-2"><strong>所在地：</strong> 河南 开封</li> 
      <li class="mb-2"><strong>兴趣：</strong> 电影，阅读，羽毛球</li>  
    </ul>
  </div>
</div>

<!-- 4. 技能/经历模块：示例为技能卡片，可替换为“我的经历”“我的作品”等 -->
<div class="mt-5" style="max-width: 800px; margin: 0 auto;">
  <h5>我的技能</h5>
  <div class="row mt-3">
    <!-- 技能1：修改名称和描述 -->
    <div class="col-md-6 mb-3">
      <div class="card">
        <div class="card-body">
          <h6 class="card-subtitle mb-2 text-muted">二进制安全</h6>
          <p class="card-text">……</p>
        </div>
      </div>
    </div>
    <div class="col-md-6 mb-3">
      <div class="card">
        <div class="card-body">
          <h6 class="card-subtitle mb-2 text-muted">待定</h6>
          <p class="card-text">待定</p>
        </div>
      </div>
    </div>
  </div>
</div>