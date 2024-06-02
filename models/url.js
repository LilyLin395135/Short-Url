import axios from "axios";

const baseUrl = 'http://localhost:3001/urls';

export const urlModel = {
    async saveUrl(longUrl, shortUrl, clickCount, expiryDate) {
        try {
            const response = await axios.post(baseUrl, {
                longUrl,
                shortUrl,
                clickCount,
                expiryDate
            });
            return response.data.id;
        } catch (error) {
            console.error('Error saving url:', error.errors.map(e => e.msg));
            throw new Error('Error saving url, please try again.');
        }
    },

    async getAllUrls(page, pageSize) {
        try {
            const offset = page * pageSize;
            const limit = pageSize + 1;

            const response = await axios.get(baseUrl, {
                params: {
                    _limit: limit,
                    _start: offset
                }
            });

            const allUrls = response.data;
            let nextPage = null;

            if (allUrls.length > pageSize){
                allUrls.pop();
                nextPage = page + 1;
            }

            return { allUrls, nextPage };
        } catch (error) {
            console.error('Error getting urls:', error.message);
            throw new Error('Error getting urls, please try again.');
        }
    },

    async getUrl(id) {
        try {
            const response = await axios.get(`${baseUrl}/${id}`);

            if (!response.data) {
                throw new Error(`URL ID = ${id} not found`);
            };

            return response.data;
        } catch (error) {
            if (error.response && error.response.status === 404) {
                throw new Error(`URL ID = ${id} not found`);
            }
            console.error('Error getting url:', error.message);
            throw new Error('Error getting url, please try again.');
        }
    },

    async  updateClickCount(shortUrl) {
        try {
            // 查找對應的記錄
            const response = await axios.get(`${baseUrl}?shortUrl=${shortUrl}`);
            const urlData = response.data[0];

            if (urlData) {
                const updatedUrl = {
                    ...urlData,
                    clickCount: urlData.clickCount + 1
                };

                // 更新該記錄
                const updateResponse = await axios.put(`${baseUrl}/${urlData.id}`, updatedUrl);
                console.log('更新成功:', updateResponse.data);
                return updateResponse.data;

            } else {
                console.log('找不到對應的 shortUrl:', shortUrl);
                throw new Error(`URL not found`);
            }
        } catch (error) {
            if (error.response && error.response.status === 404) {
                throw new Error(`This shortUrl not found`);
            }
            console.error('Error getting url:', error.message);
            throw new Error('Error getting url, please try again.');
        }
    }
};