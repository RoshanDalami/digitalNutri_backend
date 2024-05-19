import {ApiResponse} from '../utils/ApiResponse.js'
import {ReferralCodes} from '../constant.js'
export async function Promo(req,res){

    try {
        const {price,code} = req.body;
        let priceAfterDiscount = 0;

        for(let i = 0 ; i < ReferralCodes.length; i++){
            if(ReferralCodes[i].code === code ){
                priceAfterDiscount = price - (price*(ReferralCodes[i].discount)/100);
            }
        }

        return res.status(200).json(new ApiResponse(200,priceAfterDiscount,"Promo code applied"))
        
  
    } catch (error) {
        return res.status(500).json(new ApiResponse(500,null,"Internal Server Error"))
    }
}