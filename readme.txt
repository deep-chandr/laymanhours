React and Node integration : 
https://medium.freecodecamp.org/how-to-make-create-react-app-work-with-a-node-backend-api-7c5c48acb1b0

Please note make use of observer to the closest of the class, array or any other datatype:
Correct: export default inject('mainStore')(withRouter(observer(topPost)));
wrong: export default inject('mainStore')((observer(withRouter(topPost))));