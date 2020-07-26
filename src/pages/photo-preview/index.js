import React from 'react';
// 导入图片预览组件
import PhotoPreview from '@/components/photo-preview';

// 模拟图片列表数据
const atlasImgList = [
    {
        url: 'http://dummyimage.com/200x100/ff3838&text=Hello',
        bigUrl: 'http://dummyimage.com/800x400/ff3838&text=Hello',
        alt: 'Hello',
    },
    {
        url: 'http://dummyimage.com/200x100/ff9f1a&text=Photo',
        bigUrl: 'http://dummyimage.com/800x400/ff9f1a&text=Photo',
        alt: 'Photo',
    },
    {
        url: 'http://dummyimage.com/200x100/c56cf0&text=Preview',
        bigUrl: 'http://dummyimage.com/800x400/c56cf0&text=Preview',
        alt: 'Preview',
    },
    {
        url: 'http://dummyimage.com/100x100/3ae374&text=!',
        bigUrl: 'http://dummyimage.com/400x400/3ae374&text=!',
        alt: '！',
    },
];

const Test = () => {
    return (
        <>
            {atlasImgList.map((item, index) => {
                return (
                    <PhotoPreview
                        key={index}
                        imgIndex={index}
                        imgs={atlasImgList}
                        url={item.url}
                        bigUrl={item.bigUrl}
                        alt={item.alt}
                        // tool={{ turnLeft: false, turnRight: false }}
                    />
                );
            })}
        </>
    );
};

export default Test;
