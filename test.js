var createStore = require('redux').createStore;


/* 
    action이 오면 저장되 있는 값을 반환하는 Reducer라는 걸 생성함 
    전달은 action을 함수로 전달한다. 
    액션과 state의 연결 고리를 지정해 놓았다고 생각한다.
*/
function counter(state = 0, action) {
  switch (action.type) {
  case 'INCREMENT':
    return state + 1
  case 'DECREMENT':
    return state - 1
  default:
    return state
  }
}

/* 저장소를 만들땐  createStore 안에 reducer를 지정해준다 */
let store = createStore(counter)

// subscribe 로 상태 값의 변동이 있으면 console에 뿌려준다.
store.subscribe(() =>
  console.log(store.getState())
)

//액션은 dispatch로 실행하고 액션을 넘겨준다.
//dispatch 를 할때마다 저장소에 값을 변경한다.
store.dispatch({ type: 'INCREMENT' })
// 1
store.dispatch({ type: 'INCREMENT' })
// 2
store.dispatch({ type: 'DECREMENT' })
// 1