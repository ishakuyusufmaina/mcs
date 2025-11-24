class User {
    
    constructor(){
        this.qAs =[]
        this.totalScore = 0;
        this.continuety = false
    }
    
    setContinuety(con){
        this.continuety = cont
    }
    getContinuety(){
        return this.continuety
    }
    addQA(qa){
        this.qAs.push(qa)
    }
    getQAs(){
        return this.qAs
    }
    addScore(n){
        this.totalScore +=n
    }
    getTotalScore(){
        return this.totalScore
    }
    
}



class Question {
    
    constructor(level){
        this.randint =(level)=>{
            let num = Math.random();
            num = num*level + 1
            return Math.floor(num)
        }
        this.level = level;
        this.term1 = this.randint(level)
        this.term2 = this.randint(level)
        let opSize = OPERATORS.length;
        let opIndex = this.randint(opSize)
        this.operator = OPERATORS[opIndex-1]
        if (this.operator == "/"){
            this.pickDivisible();
        }
        
    }
    evaluate(){
       let o = this.operator
       let t1 = this.term1
       let t2 = this.term2
        switch(o) {
            case "+": return t1 + t2
            case "-": return t1 - t2
            case "×": return t1 * t2
            default: return t1 / t2
            
        }
    }
    
    pickDivisible(){
        let result = this.term1/this.term2;
        if (!Number.isInteger(result)){
            this.term1 = this.randint(this.level);
            this.term2 = this.randint(this.level);
            this.pickDivisible();
        }
    }
    
    toString(){
        return `${this.term1} ${this.operator} ${this.term2} = `
    }
}




/*
class Feedback {
    constructor(qAs, test){
        this.qAs = qAs
        this.test = test
    }
    generate(){
       let feedback = qAs.map((qa, i, qas)=>{
       let    q = qa.question.toString();
        let   a = qa.answer;
            comment = (isCorrect(qa.question, a)) ? "Correct" : "Wrong, correction: " + qa.question.evaluate()
            return q + " " + a + " " + comment;
        })
        
    }
    generateAsHTML(){
       let feedback = this.qAs.map((qa, i, qas)=>{
           let q = qa.question.toString();
           let a = qa.answer;
            let htmlComment = (isCorrect(qa.question, a)) ? "<span>Correct</span>" : "<span>Wrong</span>, <span>correction: " + qa.question.evaluate() + "</span>";
            return "<p><span>"+q+"</span> <span>"+a+"</span>  <span>" + htmlComment+"</span></p>";
        })
        return feedback
        
    }
    
    toString(){
        feedback = ""
        this.qAs.forEach((qa, i, qAs)=>{
         let   q = qa.question;
         let   a = qa.answer;
            feedback += (i+1) + ". " + q.toString() + a + ((this.test(q, a))? "Correct" : "Wrong, Correction: " + q.evaluate()) + "\n"
            
            })
        return feedback
    }
}
    





class Summary {
    constructor(user, level){
        this.user = user
        this.level = level
    }
    
    getQuestion(){
       let qAs = this.user.getQAs()
        return qAs.length;
    }
    getCorrectAns(){
       let crrAns =0
      let  qAs = this.user.getQAs();
      qAs.forEach((qa, i, ar)=>{
            if (isCorrect(qa.question, qa.answer)) crrAns++
        })
        return crrAns
        
    }
    getTotalScore(){
        return this.user.getTotalScore();
    }
    
   toString(){
      let  summary = `
        Summary
        +++++++++++++++++++++++++++++++++++
        Level: ${this.level}
        Total question: ${this.getQuestion()}
        Correct answer: ${this.getCorrectAns()}
        Wrong  answer : ${this.getQuestion() - this.getCorrectAns()}
        Total  score  : ${this.getTotalScore()}
        Relative Score: ${(this.getCorrectAns()/this.getQuestion()) * 100}
        +++++++++++++++++++++++++++++++++++
       `;
        return summary;
    } 
}

*/
function isCorrect(q, a){
    
    return q.evaluate() == eval(a);
};



/*class App{
    constructor(){ this.root = create('div'); this.root.id='app-inner'; this.level=0; this.user=null; this.question=null; this.ans=''; this.time = 15; this.promptLevelChoice(); document.getElementById('app').appendChild(this.root); }

    promptLevelChoice(){ this.levelInput = new LevelInput(DIFFICULTY); this.levelInput.playPick = ()=> picksound.play(); this.levelInput.render(this.root); this.levelInput.onInput((level)=>{ this.level = level; this.startQuiz(); }) }

    startQuiz(){ startsound.play(); this.user = new User(); this.adminQuestion(); }

    adminQuestion(){ this.question = new Question(this.level); this.questComp = new QuestionComponent(this.question); this.questComp.onQuestion = this.onQuestionAdmin; this.keyboard = new Keyboard(); this.root.innerHTML = `<div class='top-row'><div id='count-wrap'><div id='count-down'>${this.time}</div></div></div>`; this.questComp.appendTo(this.root); this.keyboard.appendTo(this.root);
      this.keyboard.setOnInput((keybtn)=>{ let key = keybtn.textContent; if (key === '-' && this.ans.length>0) return; if (this.ans.includes('.') && key === '.') return; if ((this.ans.slice(-1)==='.' || this.ans.slice(-1)==='-') && key === '-') return; switch(key){ case 'Enter': this.keyboard.setDisabled(true); this.enterAnswer(); this.ans=''; break; case 'Del': this.ans = this.ans.slice(0,-1); this.questComp.setAnswer(this.ans || ''); break; default: clicksound.play(); this.ans += key; this.questComp.setAnswer(this.ans); } }); this.state='QuestAdmin'; }

    enterAnswer(){ const user = this.user; const question = this.question; const ans = (this.ans==='-'|| this.ans==='.')? '': this.ans; user.addQA({question, answer: ans}); let response=''; if (isCorrect(question, ans)){ user.addScore(1); success.play(); response = `<span style='color:var(--accent-2);font-weight:700'>Correct ✓</span>` } else { wrongans.play(); response = `<span style='color:var(--danger);font-weight:700'>Wrong</span>` }
      const questAns = question.toString() + ' ' + ans; this.root.innerHTML += `<div id='microfeedback'><p style='margin:0'><strong>${questAns}</strong></p><p style='margin:6px 0'>${response}</p><p style='margin:0'>Total Score: ${user.getTotalScore()}</p></div>`; this.promptConti(); this.state='AnsEntered'; }

    promptConti(){ const contInput = create('div'); contInput.style.display='flex'; contInput.style.gap='8px'; contInput.style.marginTop='8px'; const btnCont = create('button'); btnCont.textContent='Continue'; const btnFinish = create('button'); btnFinish.textContent='Finish'; btnCont.className = 'key'; btnFinish.className='key'; btnCont.addEventListener('click', ()=>{ this.adminQuestion() }); btnFinish.addEventListener('click', ()=>{ this.giveFeedback(); this.giveSummary(); this.retakePrompt(); }); const microf = $('#microfeedback'); microf.appendChild(contInput); contInput.appendChild(btnCont); contInput.appendChild(btnFinish); }

    giveFeedback(){ const fb = new Feedback(this.user.getQAs()); const view = new FeedbackView(fb); view.render(this.root); }
    giveSummary(){ const sum = new Summary(this.user, this.level); const sv = create('div'); sv.style.marginTop='12px'; sv.textContent = sum.toString(); this.root.appendChild(sv); }
    retakePrompt(){ const rbox = create('div'); rbox.style.marginTop='12px'; const rbtn = create('button'); rbtn.textContent='Retake'; rbtn.className='key'; rbtn.addEventListener('click', ()=> this.startQuiz()); const exit = create('button'); exit.textContent='Exit'; exit.className='key'; exit.addEventListener('click', ()=> this.promptLevelChoice()); rbox.appendChild(rbtn); rbox.appendChild(exit); this.root.appendChild(rbox); }
  }*/

  class Feedback{ constructor(qAs){ this.qAs = qAs } generateAsHTML(){ return this.qAs.map(qa=>{ const q = qa.question.toString(); const a = qa.answer; const ok = isCorrect(qa.question, a); return `<p><strong>${q}</strong> <span>${a}</span> — ${ok? '<span style="color:var(--accent-2)">Correct</span>' : '<span style="color:var(--danger)">Wrong</span>, correction: ' + qa.question.evaluate()}</p>` }) } }

  class Summary{ constructor(user, level){ this.user = user; this.level=level } getQuestion(){ return this.user.getQAs().length } getCorrectAns(){ return this.user.getQAs().filter(qa=>isCorrect(qa.question, qa.answer)).length } getTotalScore(){ return this.user.getTotalScore() } toString(){ return `Summary\nLevel: ${this.level}\nTotal question: ${this.getQuestion()}\nCorrect answer: ${this.getCorrectAns()}\nWrong answer: ${this.getQuestion()-this.getCorrectAns()}\nTotal score: ${this.getTotalScore()}\nRelative Score: ${ (this.getQuestion()? Math.round((this.getCorrectAns()/this.getQuestion())*100) : 0) }%` } }
