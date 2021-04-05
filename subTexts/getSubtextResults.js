export const getSubtextResults = (searchText, subTexts) => {
  //Note that if searchText and/or subTexts are likely to be ginormous, then we will want to look for a way of doing 
  //this with better than O(n x m) algorithmic complexity. But just keeping things simple (and easily unit-testable) for now.

  let results = subTexts.map(subText => ({
    "subtext": subText,
    "result": getSubtextResult(searchText, subText)
  }));

  return results;
}

const getSubtextResult = (searchText, subText) => {
  const indexes = getSubtextIndexes(searchText, subText);

  if (indexes.length == 0)
    return "<No Output>";

  return indexes.map(index => index+1).join(',');
}

export const getSubtextIndexes = (searchText, subText) => {
  if (subText.length == 0)
    return [];

  let indexes = [];
  
  for (let i = 0; i < searchText.length; i++) {
    if (isSubTextFound(searchText,i,subText))
      indexes.push(i);
  }

  return indexes;
}

const isSubTextFound = (searchText, searchTextIndex, subText) => {
  let i = searchTextIndex, j = 0;
  while (i+j < searchText.length && j < subText.length) {
    if (searchText[i+j].toUpperCase() !== subText[j].toUpperCase())
      return false;
    j++;
  }
  return true;
}