var db = require('./databaseConfig.js');
var Promotions = require('./promotions.js')

var promotionDB = {
    getAllPromotion: function (countryId) {
        return new Promise((resolve, reject) => {
            var conn = db.getConnection();
            conn.connect(function (err) {
                if (err) {
                    console.log(err);
                    conn.end();
                    return reject(err);
                }
                else {
                        //sql for promotion
                        var sql = `select itementity.id as ID , itementity.NAME as name, furnitureentity.IMAGEURL as imageURL , itementity.SKU	 as sku , itementity.DESCRIPTION 
                as description,itementity.TYPE as type, itementity._LENGTH as length , itementity.WIDTH as width , itementity.HEIGHT as height ,
                itementity.CATEGORY as category , promotionentity.DISCOUNTRATE  as discountrate, item_countryentity.RETAILPRICE as price  from itementity , furnitureentity , promotionentity , item_countryentity
                 where itementity.ID = furnitureentity.ID and itementity.ID = item_countryentity.ITEM_ID and item_countryentity.ITEM_ID = promotionentity.ITEM_ID and item_countryentity.COUNTRY_ID = ?`
                        conn.query(sql,[countryId],function (err, result) {
                            if (err) {
                                conn.end()
                                return reject(err)

                            } else { 
                                var promoList = []  // set empty array for promolist
                                for (var i = 0; i < result.length; i++) {
                                    var promo = new Promotions(); // import from promotions.js
                                    promo.id = result[i].id;
                                    promo.name = result[i].name;
                                    promo.imageURL = result[i].imageURL;
                                    promo.sku = result[i].sku;
                                    promo.description = result[i].description;
                                    promo.type = result[i].type;
                                    promo.length = result[i].length;
                                    promo.width = result[i].width;
                                    promo.height = result[i].height;
                                    promo.category = result[i].category;
                                    promo.price = result[i].price;
                                    promo.discountrate = result[i].discountrate;
                                    promoList.push(promo) // push prom into array
                                }
                                conn.end()
                                return resolve(promoList)
                            }
                        })
                    
                }
            })
        })
    }
}

module.exports = promotionDB