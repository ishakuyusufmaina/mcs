class Component {
    constructor(){
        
    }
    onInput(calback){
        
    }
    render(root){
       root.innerText ="";
        root.appendChild(this.view())
    }
    appendTo(root){
        root.appendChild(this.view())
    }
    
    view() {
        
    }
}

//*******************************
create = (el)=>{
            return document.createElement(el)
        }

//*******************************
    
function createRadios (labels){
    radios = labels.map((label, i)=>{
        input = create("input");
        labelElm = create("label")
        labelElm.setAttribute("for", "level" + i);
        labelElm.innerText = label
        input.type = "radio"
        input.name = "level"
        input.id="level"+i
        return {label: labelElm, radio: input}
        
    })
    return radios
}

//*****************************

class LevelInput extends Component{
    constructor (model){
        super();
        this.levels = createRadios(model)
        this.inputBtn = create("button");
        this.inputBtn.innerText = "Enter";
       this.inputBtn.className = "enter-btn";
        this.level = 100;
        this.playPick = ()=>{};
        this.levels.forEach((level, i, levels)=>{
           let radio = level.radio
            if (i==0){radio.checked=true}
            radio.value= (i+1)*100
            radio.onchange = ()=>{
                if (radio.checked) {
                    this.level = radio.value;
                    this.playPick();
                   // picksound.play();
                }
            }
        })
    }
    onInput(callback){
        this.inputBtn.onclick = ()=>{
            callback(this.level)
        }
    }
    view(){
        let prompt = create("div");
        let oList = create("ol");
        let enterBtn = this.inputBtn
        this.levels.forEach((level, i, levels)=>{
            let radio = level.radio;
            let label = level.label;
            let list = create("li");
            list.appendChild(radio);
            list.appendChild(label)
            oList.appendChild(list);
        })
        prompt.appendChild(oList)
        prompt.appendChild(enterBtn)
        return prompt
    }
}
//******************************

class QuestionComponent extends Component {
    
    constructor(question){
        super();
        this.question = create("p");
        this.question.setAttribute("class", "question")
        let exp = question;
        this.expression = create("span")
        this.question.appendChild(this.expression)
        //this.question.innerHTML = `<span class="expression">${question.toString()}</span>`
        this.value = create("span");
        this.value.classList.add("answer", "hide");
        this.question.appendChild(this.value);
        /*this.ansInput.addEventListener("keydown", (e)=>{
            if (e.key=="Enter") {this.inputBtn.click()}
        })
        this.ansInput.type="number";
        this.inputBtn = create("button");
        this.inputBtn.textContent = "Enter"
        */
        this.onQuestion = ()=>{};
        let o1kf1 = question.term1;
        let o2kf1 = question.term2;
        let op = question.operator;
        this.animateExp([o1kf1-20, o1kf1], op, [o2kf1-20, o2kf1]);
    }
    
    /* onInput(callback){
        this.inputBtn.onclick = ()=>{
            callback(this.ansInput.value)
        }
    }
    */
    view(){
        return this.question;
    }
    setAnswer(ans){
        this.value.textContent=ans
    }
    
    animateExp(o1kf, op, o2kf){
        //okf = operator keyframes
        let o1kf0 = o1kf[0];
        let o1kf1 = o1kf[1];
        let o2kf0 = o2kf[0];
        let o2kf1 = o2kf[1];
        //let s0 = exp.length;
        //let s1 = this.expression.innerHTML.length;
        //first operand
        if (o1kf1 > o1kf0){
            this.expression.innerHTML = `<span class="operand">${o1kf0}</span> <span class="operator">?</span> <span class="operand">?</span> = `;
            setTimeout(()=>{this.animateExp([o1kf0+1, o1kf1], op, o2kf)}, 50)
        } else
        if (o2kf1>=o2kf0){
        this.expression.innerHTML = `<span class="operand">${o1kf0}</span> <span class="operator">${op}</span> <span class="operand">${o2kf0}</span> = `;
            setTimeout(()=>{this.animateExp(o1kf, op, [o2kf0+1, o2kf1])}, 50)
     }
        else {
            this.value.classList.toggle("hide");
            this.onQuestion();
        }
        
    }
}

//***********************

class RetakeInput extends Component {
    constructor(){
        super();
        this.retakeBtn = create("button")
        this.retakeBtn.innerHTML = "Retake";
        this.exitBtn = create("button")
        this.exitBtn.innerHTML  = "Exit";
        this.prompt = create("ul");
        this.prompt.id = "promptBtns";
        this.prompt.appendChild(this.retakeBtn)
        this.prompt.appendChild(this.exitBtn)
        
     
        
    }
    onInput(callback){
        this.retakeBtn.onclick = ()=> {
            callback(true)
        }
        this.exitBtn.onclick = ()=>{
            callback(false)
        }
    }
    view(){
           return this.prompt;
    }
}

//****************************

class ContinueInput extends RetakeInput {
    
    constructor(continuePrompt){
        super(continuePrompt)
        this.retakeBtn.innerText = "Continue";
        this.exitBtn.innerText = "Finish"
    }
}

//*****************************

class FeedbackView extends Component {
    constructor(feedback){
        super();
        this.feedbacks=feedback.generateAsHTML()
    }
    view(){
        let oList = create("ol");
        this.feedbacks.forEach((f, i, fs)=>{
            let list = create("li");
            list.innerHTML = f
            oList.appendChild(list);
        })
        return oList
    }
}

class SummaryView extends Component{
    constructor(summary){
        super();
        this.summary = summary;
    }
    
    view(){
       let sum = create("div");
        sum.innerText = this.summary.toString();
        return sum
    }
}



//******************************

class Keyboard extends Component {
  constructor(){
      super();
    this.board = document.createElement("div");
    this.board.setAttribute("class", "keyboard");
    this.oninput = (key)=>{};
    let keys = "1234567890.-".split("");
    keys = keys.concat(["Enter", "Del"]);
      this.btns = [];
    keys.forEach((e, i, arr)=>{
      let key = document.createElement("button");
      key.textContent = e;
      key.id = "k" + e
        key.setAttribute("class", "key");
      key.classList.add("key");
      key.addEventListener("click", ()=>{this.oninput(key)})
      this.board.appendChild(key)
        this.btns.push(key)
    })
    
  }
 setOnInput(callback){
   this.oninput = callback
 }
  view(){
    return this.board;
  }
    
    setDisabled(bool){
        this.btns.forEach((btn)=>{
            btn.setAttribute("disabled", bool)
        })
    }
                }
