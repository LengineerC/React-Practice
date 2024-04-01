import { Navigate } from "react-router-dom";
// import Start from "../componentes/Start/Start";
import Game from "../componentes/Game/Game";
// import Level1 from "../componentes/Level1/Level1";
import Tools from "../componentes/Tools/Tools";
import Calculator from "../componentes/Tools/Calculator/Calculator";
import Unicode from "../componentes/Tools/Unicode/Unicode";

export default [
    {
        path:'/tools',
        element:<Tools/>,
        children:[
            {
                path:'calculator',
                element:<Calculator/>
            },
            {
                path:'unicode',
                element:<Unicode/>
            },
            {
                path:'/tools',
                element:<Navigate to='unicode'/>
            }
        ]   
    },
    {
        path:'/game/*',
        element:<Game/>,
        // children:[
        //     {
        //         path:'menu',
        //         element:<Start/>
        //     },
        //     {
        //         path:''
        //     }
        // ]
    },
    {
        path:'/',
        element:<Navigate to="/game/menu"/>
        // element:<Navigate to="/tools/unicode"/>
    }
]