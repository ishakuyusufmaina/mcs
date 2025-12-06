function interpret(score, interpsModel){
    for (const interp of interpsModel){
      if (Number(score) < Number(interp.range))
        return {grade:interp.grade, remark:interp.remark}
    }
    
    let lastInterp = interpsModel[interpsModel.length-1];
    return {grade:lastInterp?.grade || '', remark:lastInterp?.remark || ''};
  }

