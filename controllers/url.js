import { urlModel } from '../models/url.js';
import { generateShortURL } from '../utils/idGenerator.js';
import { generateRandomString } from '../utils/randomStringGenerator.js';
import { hashURL } from '../utils/hashGenerator.js';

const PAGESIZE = 6;

const createShortUrlController = async (req, res, next) => {
    try {
        let { longUrl, expiryDate } = req.body;

        //如果沒有指定 expiryDate，則設置過期時間為一個月後
        if (!expiryDate) {
            expiryDate = new Date();
            expiryDate.setMonth(expiryDate.getMonth() + 1);
        }
        //shortURL
        //方法一：亂碼
        // const shortUrl = Math.random().toString(36).substr(2, 7);
        //方法二：經過base62，用資料庫的 id (auto increment)，生成唯一的 shortURL 
        // const shortUrl = generateShortURL();
        //方法三：經過base62，將隨機字串轉換
        const shortUrl = generateRandomString(7).substring(0, 7);
        //方法四：經過base62，將隨機字串轉換
        // const shortUrl = hashURL(longUrl).substring(0, 7);

        //設定clickCount為0
        const clickCount = 0;

        //將longUrl、expiryDate存入資料庫
        const urlId = await urlModel.saveUrl(longUrl, shortUrl, clickCount, expiryDate);

        res.status(201).json({ id: urlId });
    } catch (error) {
        next(error);
    }
};

const getShortUrlController = async (req, res, next) => {
    try {
        const page = parseInt(req.query.paging, 10) || 0;
        const pageSize = PAGESIZE;
        const { allUrls, nextPage } = await urlModel.getAllUrls(page, pageSize);
        res.status(200).json({ data: allUrls, next_page: nextPage });
    } catch (error) {
        next(error);
    }
};

const getShortUrlByIdController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const urlData = await urlModel.getUrl(id);

        if (!urlData) {
            return res.status(404).json({ message: 'Short url not found' });
        }

        res.status(200).json(urlData);
    } catch (error) {
        next(error);
    }
};

const redirectByShortUrlController = async (req, res, next) => {
    try {
        console.log(req.params)
        const { shortUrl } = req.params;
        const urlData = await urlModel.updateClickCount(shortUrl);

        if (!urlData.longUrl) {
            return res.status(404).json({ message: 'LongUrl not found' });
        }
        res.redirect(301, urlData.longUrl);
    } catch (error) {
        next(error);
    }
};

export { createShortUrlController, getShortUrlByIdController, getShortUrlController, redirectByShortUrlController };
