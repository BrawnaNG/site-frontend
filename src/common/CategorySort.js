class CategorySort {
    sortCategories( a, b ){
        if (!a.parent && b.parent){
          return -1;
        }
        else if (a.parent && !b.parent){
          return 1;
        }
  
        if (a.name < b.name){
          return -1;
        }
        else if (a.name > b.name){
          return 1;
        }
  
        if (a.id < b.id){
          return -1;
        }
        else if (a.id > b.id){
          return 1;
        }
  
        return 0;
    }

    sortByTitle(a, b){
        if (a.title < b.title){
            return -1;
        }
        else if (a.title > b.title){
            return 1;
        }
        return CategorySort.sortById(a, b);
    }

    static sortByName(a, b){
        if (a.name < b.name){
            return -1;
        }
        else if (a.name > b.name){
            return 1;
        }
        return 0;
    }

    static sortById(a, b){
        if (a.id < b.id){
            return -1;
        }
        else if (a.id > b.id){
           return 1;
        }
        return 0;
    }

    static sortByParent(a, b){
        if (a.parent_name < b.parent_name){
            return -1;
        }
        else if (a.parent_name > b.parent_name){
           return 1;
        }
        return 0;
    }

  };
  
  export default new CategorySort();