const fs = require('fs');


const removeImage = (imagePathRemove, users, indexFinded) => {
    return new Promise(resovle => {
        try {
            fs.unlink(imagePathRemove, err => {
                if (err) {
                    if (err.code === 'ENOENT')
                        return resovle({ error: true, message: 'LOI KHONG TIM THAY FILE' })
                    return resovle({ error: true, message: 'LOI KHAC' });                    
                }
                console.log(`remove file successed`);
                users.splice(indexFinded, 1);
                return resovle({ error: false, message: 'remove_successed' });
            })
        } catch (error) {
            return resovle({ error: true, message: error.message });
        }
    })
}

exports.REMOVE_IMAGE = removeImage;