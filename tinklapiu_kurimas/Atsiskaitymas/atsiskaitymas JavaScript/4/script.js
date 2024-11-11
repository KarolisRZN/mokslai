const filterItems = (arr, query) => {
    return arr
      .filter(item => item.toLowerCase().includes(query.toLowerCase()))
      .sort()
      .map(item => `*${item}`);
  };
  
  const friends = ["Rika", "Jacob", "Alex", "Oliver", "Marika"];
  
  console.log(filterItems(friends, 'ka'));
  console.log(filterItems(friends, 'e'));
  