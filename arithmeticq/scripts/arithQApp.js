class App{
    constructor(){ this.root = create('div'); this.root.id='app-inner'; this.level=0; this.user=null; this.question=null; this.ans=''; this.time = 15; this.promptLevelChoice(); document.getElementById('root').appendChild(this.root); }

    promptLevelChoice(){ this.levelInput = new LevelInput(DIFFICULTY); this.levelInput.playPick = ()=> picksound.play(); this.levelInput.render(this.root); this.levelInput.onInput((level)=>{ this.level = level; this.startQuiz(); }) }

    startQuiz(){ startsound.play(); this.user = new User(); this.adminQuestion(); }

    adminQuestion(){ this.question = new Question(this.level); this.questComp = new QuestionComponent(this.question); this.questComp.onQuestion = this.onQuestionAdmin; this.keyboard = new Keyboard(); this.root.innerHTML = `<div class='top-row'><div id='count-wrap'><div id='count-down'>${this.time}</div></div></div>`; this.questComp.appendTo(this.root); this.keyboard.appendTo(this.root);
      this.keyboard.setOnInput((keybtn)=>{ let key = keybtn.textContent; if (key === '-' && this.ans.length>0) return; if (this.ans.includes('.') && key === '.') return; if ((this.ans.slice(-1)==='.' || this.ans.slice(-1)==='-') && key === '-') return; switch(key){ case 'Enter': this.keyboard.setDisabled(true); this.enterAnswer(); this.ans=''; break; case 'Del': this.ans = this.ans.slice(0,-1); this.questComp.setAnswer(this.ans || ''); break; default: clicksound.play(); this.ans += key; this.questComp.setAnswer(this.ans); } }); this.state='QuestAdmin'; }

    enterAnswer(){ const user = this.user; const question = this.question; const ans = (this.ans==='-'|| this.ans==='.')? '': this.ans; user.addQA({question, answer: ans}); let response=''; if (isCorrect(question, ans)){ user.addScore(1); success.play(); response = `<span style='color:var(--accent-2);font-weight:700'>Correct ✓</span>` } else { wrongans.play(); response = `<span style='color:var(--danger);font-weight:700'>Wrong</span>` }
      const questAns = question.toString() + ' ' + ans; this.root.innerHTML += `<div id='microfeedback'><p style='margin:0'><strong>${questAns}</strong></p><p style='margin:6px 0'>${response}</p><p style='margin:0'>Total Score: ${user.getTotalScore()}</p></div>`; this.promptConti(); this.state='AnsEntered'; }

    promptConti(){ const contInput = create('div'); contInput.style.display='flex'; contInput.style.gap='8px'; contInput.style.marginTop='8px'; const btnCont = create('button'); btnCont.textContent='Continue'; const btnFinish = create('button'); btnFinish.textContent='Finish'; btnCont.className = 'key'; btnFinish.className='key'; btnCont.addEventListener('click', ()=>{ this.adminQuestion() }); btnFinish.addEventListener('click', ()=>{ this.giveFeedback(); this.giveSummary(); this.retakePrompt(); }); const microf = document.getElementById('microfeedback'); microf.appendChild(contInput); contInput.appendChild(btnCont); contInput.appendChild(btnFinish); }

    giveFeedback(){ const fb = new Feedback(this.user.getQAs()); const view = new FeedbackView(fb); view.render(this.root); }
    giveSummary(){ const sum = new Summary(this.user, this.level); const sv = create('div'); sv.style.marginTop='12px'; sv.textContent = sum.toString(); this.root.appendChild(sv); }
    retakePrompt(){ const rbox = create('div'); rbox.style.marginTop='12px'; const rbtn = create('button'); rbtn.textContent='Retake'; rbtn.className='key'; rbtn.addEventListener('click', ()=> this.startQuiz()); const exit = create('button'); exit.textContent='Exit'; exit.className='key'; exit.addEventListener('click', ()=> this.promptLevelChoice()); rbox.appendChild(rbtn); rbox.appendChild(exit); this.root.appendChild(rbox); }
  }

/*class App {
    constructor(){
        this.root = document.createElement("div");
        this.root.id = "app";
        this.level = 0;
        this.user = null;
        this.question = "";
        this.ans="";
        this.onQuestionAdmin = ()=>{};
        this.promptLevelChoice();
        this.state="";
        this.time = 15;
    }
    
    resume(level, user, question, ans){
        
    }
    
promptLevelChoice (){
    this.levelInput = new LevelInput(DIFFICULTY);
    this.levelInput.render(this.root);
    this.levelInput.playPick = ()=>{picksound.play()};
    this.levelInput.onInput((level)=>{
        this.level = level
        this.startQuiz();
    })
    this.state="LevelChoice";
}



startQuiz(){
    startsound.play();
    this.user = new User();
    this.adminQuestion()
}
    
    

adminQuestion (){
    this.question = new Question(this.level)
    this.questComp = new QuestionComponent(this.question);
    this.questComp.onQuestion = this.onQuestionAdmin;
    this.keyboard = new Keyboard();
    this.root.innerHTML = `<p id='count-down'>${this.time}</p>`;
    this.questComp.appendTo(this.root);
    this.keyboard.appendTo(this.root);
    //keyboard.disable();
    this.keyboard.setOnInput((keybtn)=>{
        let key = keybtn.textContent;
        //to avoid forcing the sys perform subtraction
        if (key=="-" & this.ans.length>0){return}
        if (this.ans.search(/[.]/gi) != -1 & key==".") {
            return
        }
        
        else if ((this.ans[this.ans.length-1]=='.' || this.ans[this.ans.length-1]=='-') & key=="-"){
            return
        }
        switch (key) {
            
            case "Enter":
            this.keyboard.setDisabled(true);
                this.enterAnswer();
                this.ans = "";
                //this.promptConti();
                break;
            
            case "Del": 
                this.ans = this.ans.slice(0, -1);
                this.questComp.setAnswer(this.ans);
                break;
            
            
            default:
            clicksound.play();
                this.ans +=key
                this.questComp.setAnswer(this.ans)
            
        }
       // ans = answer
        //enterAnswer()
       // promptConti();
            })
    this.state = "QuestAdmin";
    
} 



enterAnswer (){
    let user = this.user;
    let question = this.question;
    let ans = (this.ans=="-"||this.ans==".")? "":this.ans;
    user.addQA({"question": question, "answer": ans})
    let response;
    if (isCorrect(question, ans)){
        user.addScore(1)
        success.play();
        response = `<span>Correct✓</span>`
    } 
    else {
        response = `Wrong!`
        wrongans.play();
    }
    let questAns = question.toString() + " " + ans;
    this.root.innerHTML += `<div id="microfeedback"><p>${questAns}</p>
    <p>${response}</p>
    <p>Total Score: ${user.getTotalScore()}</p></div>`
    this.promptConti();
    this.state="AnsEntered";
}


promptConti(){
    let contInput = new ContinueInput(CONTINUETY_PROMPT);
    let microf = document.getElementById("microfeedback");
    contInput.appendTo(microf);
    contInput.onInput((cont)=>{
        if (cont) {
            this.adminQuestion()
        }
        else {
            this.giveFeedback()
            this.giveSummary()
            this.retakePrompt()
        }
    })
    
}


giveFeedback(){
    let feedback = new Feedback(this.user.getQAs())
    let feedbackView = new FeedbackView(feedback)
    feedbackView.render(this.root);
    this.state = "EndOfSession";
}


giveSummary(){
    let summary = new Summary(this.user, this.level)
    let summaryView = new SummaryView(summary)
    summaryView.appendTo(this.root);
}




retakePrompt(){
    this.retakingInp = new RetakeInput();
    this.retakingInp.appendTo(this.root);
    this.retakingInp.onInput((isRetaking)=>{
        if (isRetaking){
            this.startQuiz();
            //this.promptLevelChoice();
        }
        else {
            //I don't know
            this.promptLevelChoice();
        }
    })
}
    
}*/


let app = new App();

//a little extension
var timerId;
app.onQuestionAdmin = ()=>{
    clearInterval(timerId);
    let enter = app.root.querySelector("#kEnter");
    enter.addEventListener("click", ()=>{clearInterval(timerId)});
    let counter = app.root.querySelector("#count-down");
    countDown(app.time, (count)=>{
        counter.innerHTML = count;
    }, ()=>{enter.click()})
}


function countDown(count, onCount, onFinish){
    if (count){
       timerId =  setTimeout(()=>{
            count--;
            onCount(count);
            countDown(count, onCount, onFinish)}, 1000)
    } else {
        clearInterval(timerId);
        onFinish();
    }
}
//app = JSON.stringify(app);
//app = JSON.parse(app);
document.getElementById("root").appendChild(app.root);
