# 如何为博客添加演出照片

## 快速开始

### 1. 准备你的照片

将演出照片重命名为有意义的文件名，例如：
- `ichiko-aoba-kings-theatre.jpg`
- `clairo-franklin-music-hall.jpg`
- `magdalena-bay-terminal5.jpg`
- `bcnr-bowery-ballroom.jpg`

### 2. 复制照片到博客目录

将图片文件复制到 `assets/img/concerts/` 目录：

```bash
# 方法 1: 使用拖拽
# 在 Finder 中打开 assets/img/concerts/ 文件夹
# 直接将照片拖拽进去

# 方法 2: 使用命令行
cp /path/to/your/photo.jpg assets/img/concerts/ichiko-aoba-kings-theatre.jpg
```

### 3. 在博客文章中引用图片

我已经在你的博客文章 `_posts/2025-05-20-concert-memories-fall2024-spring2025.md` 中的青叶市子部分添加了图片引用示例。

你只需要确保图片文件名匹配即可：`assets/img/concerts/ichiko-aoba-kings-theatre.jpg`

## 添加更多图片

### 使用 Jekyll 的 figure 标签（推荐）

这种方式支持图片缩放、添加说明文字，并且样式更美观：

{% raw %}
```liquid
{% include figure.liquid
   path="assets/img/concerts/your-photo.jpg"
   class="img-fluid rounded z-depth-1"
   zoomable=true
   caption="演出说明文字"
%}
```
{% endraw %}

**参数说明：**
- `path`: 图片路径（相对于网站根目录）
- `class`: CSS样式类
  - `img-fluid`: 响应式图片
  - `rounded`: 圆角
  - `z-depth-1`: 阴影效果
- `zoomable`: 是否可以点击放大（true/false）
- `caption`: 图片说明文字（可选）

### 使用 Markdown 语法（简单）

如果只是想快速插入图片：

```markdown
![图片描述]({{ site.baseurl }}/assets/img/concerts/your-photo.jpg)
```

### 创建图片画廊

如果你想在一行显示多张图片：

{% raw %}
```liquid
<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid
           path="assets/img/concerts/photo1.jpg"
           class="img-fluid rounded z-depth-1"
           zoomable=true
        %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid
           path="assets/img/concerts/photo2.jpg"
           class="img-fluid rounded z-depth-1"
           zoomable=true
        %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid
           path="assets/img/concerts/photo3.jpg"
           class="img-fluid rounded z-depth-1"
           zoomable=true
        %}
    </div>
</div>
<div class="caption">
    可以在这里添加整组照片的说明
</div>
```
{% endraw %}

## 示例位置

在你的博客文章中，可以在以下位置添加照片：

### Clairo 部分
在 "### The Show" 之后，描述舞台装潢的段落前

### Magdalena Bay 部分
在描述 Mica 的妆造和服装的段落旁边

### BCNR 部分
在描述乐队配器的段落旁边

### Ichiko Aoba 部分
✅ 已经添加了图片引用（第158-163行）

## 预览效果

添加完图片后，运行以下命令预览：

```bash
bundle exec jekyll serve
```

然后在浏览器中访问 `http://localhost:4000` 查看效果。

## 注意事项

1. **图片大小**: 建议宽度不超过 2000px，以加快加载速度
2. **文件格式**: 支持 `.jpg`, `.jpeg`, `.png`, `.gif`, `.webp`
3. **文件名**: 使用小写字母和连字符（-），避免空格和特殊字符
4. **图片质量**: 建议使用 70-85% 的 JPEG 质量，平衡文件大小和画质

## 图片优化（可选）

如果图片文件太大，可以使用以下工具压缩：

### 使用 ImageMagick（命令行）
```bash
# 安装 ImageMagick
brew install imagemagick

# 调整大小并压缩
convert input.jpg -resize 1920x1920\> -quality 85 output.jpg
```

### 使用在线工具
- [TinyPNG](https://tinypng.com/) - PNG/JPEG 压缩
- [Squoosh](https://squoosh.app/) - Google 出品的图片优化工具

## 需要帮助？

如果遇到问题，检查以下内容：
1. 图片文件是否在 `assets/img/concerts/` 目录中
2. 文件名是否与文章中引用的路径一致
3. 文件扩展名是否正确（.jpg 不是 .JPG）
4. 图片文件是否已提交到 git 仓库
