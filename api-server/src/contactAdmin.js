import express from "express";
import dotenv from "dotenv";
import jsonwebtoken from "jsonwebtoken";

const router = express.Router();
dotenv.config();
 
router.post("/contactlog/update", (req, res) => {
  try {
    var reqinfo = req.body;
    if(reqinfo.type == 'delete'){
        // {
        //     "type": "delete",
        //     "id": 5
        // }
        var sql = 'delete from contactlog where id=?'
        var value = [reqinfo.id];
    }
    if(reqinfo.type == 'update'){
        // {
        //     "type": "delete",
        //     "id": 5
        // }
        var sql = 'update contactlog set email=? , name=? , special=?  where id=?'
        var value = [reqinfo.info.email,reqinfo.info.name,reqinfo.info.special, reqinfo.id];
    }
    // search info from mysql
    db.query(sql, value, function(error, result) {
        if (error){
            return res.status(200).send(
                {
                    returnCode: -1,
                    reutrnMsg: error.message
                }
            )
        }
        // if user
        return res.status(200).send(
        {
            returnCode: 0,
            reutrnMsg: "success"
        }
        )
        });
    } catch (err) {
        console.log(err);
    }
    });

router.post("/contactlog/search", (req, res) => {
    try {
        
        var sql = 'select * from contactlog;'
        // search info from mysql
        db.query(sql, function(error, result) {
            if (error){
                return res.status(200).send(
                    {
                        returnCode: -1,
                        reutrnMsg: error.message
                    }
                )
            }
            // if user
            if (result) {
                var contactlogInfo = [];
                for(var i=0; i<result.length; i++){
                    contactlogInfo.push({
                        id: result[i].id,
                        name: result[i].name,
                        email: result[i].email,
                        special: result[i].special,
                    })
                }
                const resp = 
                    {
                    returnCode: 0,
                    returnMsg: 'success',
                    contactlogInfo: contactlogInfo
                    }
                return res.status(200).send(resp);
            }
            else {
                const resp = {
                    returnCode: 0,
                    returnMsg: 'success',
                    contactlogInfo: []
                }
                return res.status(200).send(resp);  
            }
            });
        } catch (err) {
            console.log(err);
        }
        });

export default router;
