import Visualizer from './Visualizer.jsx'
import './App.css'

function App() {
  return (
    <div className="app">
      <h1>Bridge Visualizer</h1>
      <h2>Problem :</h2>
      <h3>You need to build a bridge over a river, you are given the depth of river at different indices. You can install a support at any index of length equal to the depth of river at that index. Build a bridge over this river such that total length of support needed is minimum given that the distance between indices of two support does not exceed given value.</h3>
      <h2>Instructions :</h2>
      <h3>Press the generate button to generate a river with selected width and depth</h3>
      <h3>Press Dynamic Programming button visualize the dynamic programming algorithm for this problem which solves the problem in quadratic time complexity.</h3>
      <h3>Press Brute Force button watch the crazy dance of brute force algorithm which tries out all possible combinations to find the one with minimum total length and solves the problem in exponential time complexity.</h3>
      <Visualizer></Visualizer>
    </div>
  )
}

export default App