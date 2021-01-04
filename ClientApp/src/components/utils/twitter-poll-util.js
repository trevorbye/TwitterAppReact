const pollStringToObj = (pollTextWithColonDelimiter) => {
  // Change Poll delimited string to Obj with properties
  
  if (!pollTextWithColonDelimiter
    || pollTextWithColonDelimiter === ""
    || pollTextWithColonDelimiter === null
    || pollTextWithColonDelimiter === undefined
  ) {
    return pollInit();
  }
  
  if (pollTextWithColonDelimiter && pollTextWithColonDelimiter.length > 0) {
    const pollObj = pollInit();
    pollObj.hasPoll = true;

    const pollItems = pollTextWithColonDelimiter.split(":");

    let index = 1;

    for (let item of pollItems) {
      if (index < 5) {
        if (item !== "") {
          pollObj[`poll${index++}`] = item;
        }
      }
    }
    return pollObj;
  }
}

const pollObjToString = (pollObj) => {
  
  let colonDelimitedList = "";

  colonDelimitedList +=
    (pollObj.poll1.length > 0 && pollObj.poll1.length <= 25)
      ? pollObj.poll1 + ":"
      : "";

  colonDelimitedList +=
    (pollObj.poll2.length > 0 && pollObj.poll2.length <= 25)
      ? pollObj.poll2 + ":"
      : "";

  colonDelimitedList +=
    (pollObj.poll3.length > 0 && pollObj.poll3.length <= 25)
      ? pollObj.poll3 + ":"
      : "";

  colonDelimitedList +=
    (pollObj.poll4.length > 0 && pollObj.poll4.length <= 25)
      ? pollObj.poll4 + ":"
      : "";

  // remove trailing delimiter
  if (colonDelimitedList[colonDelimitedList.length - 1] === ":") {
    colonDelimitedList = colonDelimitedList.substring(
      0,
      colonDelimitedList.length - 1
    );
  }
  return colonDelimitedList;
}

const pollInit = () => {
  return {
    poll1: "",
    poll2: "",
    poll3: "",
    poll4: "",
    hasPoll: false
  };
}

export {
  pollInit,
  pollObjToString,
  pollStringToObj
}