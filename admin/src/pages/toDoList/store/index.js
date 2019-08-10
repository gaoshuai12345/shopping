
/*主要作用于不同级文件夹件组件的调用，此文件相当于是一个中转站，将
	需要在不同级文件夹中调用的组件先导入进来，再在此处导出，因为此文件命名为
	index.js，所以调用时可以省去书写文件名
*/

import * as actionCreator from './actionCreator.js';
import reducer from './reducer.js'


export { actionCreator,reducer }