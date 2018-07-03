// 轮播图

var nextIndex = function(slide, offset) {
    // 得到图片总数和当前图片下标
    var numberOfImgs = Number(slide.dataset.imgs)
    log('numberOfImgs',numberOfImgs)
    var activeIndex = Number(slide.dataset.active)
    log('activeIndex',activeIndex)
    // 求出下一张图片的 id
    log('activeIndex', activeIndex, offset, numberOfImgs)
    var i = (activeIndex + offset + numberOfImgs) % numberOfImgs
    log('i',i)
    return i
}

var bindEventSlide = function() {
    var selector = '.gua-slide-button'
    bindAll(selector, 'click', function(event) {
        // 找到 slide div
        var button = event.target
        var slide = button.parentElement
        var offset = Number(button.dataset.offset)
        var index = nextIndex(slide, offset)
        var slide = button.parentElement
        showImageAtIndex(slide, index)
    })
}

var showImageAtIndex = function(slide, index) {
    var nextIndex = index
    // 设置父节点的 data-active
    slide.dataset.active = nextIndex
    // 删除当前图片的 class 给下一张图片加上 class
    var className = 'gua-active'
    removeClassAll(className)
    // 得到下一张图片的选择器
    var nextSelector = '#id-guaimage-' + String(nextIndex)
    var img = e(nextSelector)
    img.classList.add(className)

    // 切换小圆点
    // 1. 删除当前小圆点的 class
    removeClassAll('gua-white')
    // 2. 得到下一个小圆点的选择器
    var indicatorSelector = '#id-indi-' + String(nextIndex)
    var indicator = e(indicatorSelector)
    indicator.classList.add('gua-white')
}

var bindEventIndicator = function() {
    var selector = '.gua-slide-indi'
    bindAll(selector, 'click', function(event) {
        log('indi 小圆点')
        var self = event.target
        var index = Number(self.dataset.index)
        log('index', index, typeof index)
        // 得到 slide
        var slide = self.closest('.gua-slide')
        // 直接播放第 n 张图片
        showImageAtIndex(slide, index)
    })
}

var playNextImage = function() {
    var slide = e('.gua-slide')
    // 求出下一张图片的 index
    var index = nextIndex(slide, 1)
    showImageAtIndex(slide, index)
}

var autoPlay = function() {
    var interval = 2000
    setInterval(function() {
        playNextImage()
    }, interval)
}

var __main = function() {
    bindEventSlide()
    bindEventIndicator()
    autoPlay()
}

__main()
