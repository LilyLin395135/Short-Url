import { Router } from "express";
import { redirectByShortUrlController } from "../controllers/url.js";

const router = Router();

router.get('/:shortUrl', redirectByShortUrlController);

export default router;