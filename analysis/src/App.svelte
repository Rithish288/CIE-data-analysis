<script lang="ts">
  import {Link, Router} from "svelte-navigator";
//   import { initializeApp } from "firebase/app";
//   import { collection, doc, getFirestore, setDoc } from "firebase/firestore";

function converter(jd) {
  return {
    "A*": jd["A*"],
    "A or above": jd["A or above"],
    "B or above": jd["B or above"],
    "C or above": jd["C or above"],
    "D or above": jd["D or above"],
    "E or above": jd["E or above"],
    "AS A-E grades": jd["AS A-E grades"],
    'ungraded': jd["ungraded"]
  }
}

// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);
// const coll = collection(db, "results-statistics");
// ["s20", "w20", "m21", "s21", "w21", "m22", "s22", "w22"].forEach(season => {
//   const s = doc(coll, season);
//   const thresholds = collection(s, "thresholds");
//   for(let j of json[season]) {
//     setDoc(doc(thresholds, j.Subject), converter(j))
//   }
// })
// const thresholds = collection(season, "thresholds");
// for(let j of json) {
//   setDoc(doc(thresholds, j.Subject), converter(j))
// }

const tTestLinks: string[] = [
  "Sample t test",
  "Difference in means",
  "Paired t test",
  "Confidence interval"
]
const chiTestLinks: string[] = [
  "Goodness of fit test",
  "Contingency table"
]
const nonParametricTests: string[] = [
  "Single sample sign",
  "Wilcoxon signed rank",
  "Paired sign",
  "Matched pairs signed rank",
  "Wilcoxon rank-sum"
]
</script>

<Router>
  <nav>
    <h2>t test</h2>
    {#each tTestLinks as tTestLink}
      <Link to={tTestLink}>{tTestLink}</Link>
    {/each}
    <h2>&chi;<sup>2</sup>-test</h2>
    {#each chiTestLinks as chiTestLink}
      <Link to={chiTestLink}>{chiTestLink}</Link>
    {/each}
    <h2>Non Parametric Tests</h2>
    {#each nonParametricTests as nonParametricTest}
      <Link to={nonParametricTest}>{nonParametricTest + " test"}</Link>
    {/each}
  </nav>
  <main>

  </main>
</Router>


<style>
nav {
  max-width: 500px;
  min-width: 200px;
  width: 20%;
  border-right: 3px solid black;
  padding: 0px 1em;
}


h2 {
  text-decoration: underline;
  margin: 1em 0px 0px 0px;
}
</style>
