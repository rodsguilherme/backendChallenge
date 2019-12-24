import api from './server'
import { PORT } from "./config"

api.listen(PORT, () => console.log(`Listening on port ${PORT}`))

export default api