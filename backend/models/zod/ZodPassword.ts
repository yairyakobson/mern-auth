import { z } from "zod";

const zodPasswordSchema = z
.string()
.min(6, { message: "Password must be at least 6 characters long" })
.max(255);

export default zodPasswordSchema;