import SwaggerUI from "swagger-ui-react"
import "swagger-ui-react/swagger-ui.css"

export default async function Swagger() {
  return (
    <div className='overflow-auto'>
      <SwaggerUI url='swagger.json' />
    </div>
  )
}
