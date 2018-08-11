import uuid from 'uuid';
import database from '../firebase/firebase';
//ADD EXPENSE
export const addExpense=(exp)=>({

  type:'ADD_EXPENSE',
  expense:exp
});
export const startAddExpense=(expenseData={})=>{
  return (dispatch)=>{
      const {description='',note='',createdat=0,amount=0}=expenseData;
      const expense={description,note,createdat,amount};

      database.ref('expenses').push(expense).then(ref=>{
        dispatch(addExpense({
          id:ref.key,
          ...expense
        }))
      })
  }
}

//REMOVE EXPENSE
export const remove=(item)=>({
  type:'REMOVE',
  id:item.id
})

//EDIT EXPENSE
export const editExpensePage=(id,update)=>({
type:'EDIT_EXPENSE',
id,
update
})

//SET EXPENSES
export const setExpense=(expenses)=>({
  type:'SET_EXPENSE',
  expenses:expenses 
});

export const startSetExpense=()=>{
  return (dispatch)=>{
    database.ref().on('value',(snapshot)=>{
      const allExpenses=[];
      snapshot.forEach(childSnapshot=>{
        childSnapshot.forEach(x=>{
          allExpenses.push(
            {
              id:x.key,
              ...x.val()

            });
        });
        dispatch(setExpense(allExpenses))
      })
   })
  
  }
}
    // database.ref().on('value',(snapshot)=>{
    //   const allExpenses=[];
    //   snapshot.forEach(childSnapshot=>{
    //     childSnapshot.forEach(x=>{
    //       allExpenses.push(
    //         {
    //           id:x.key,
    //           ...x.val()

    //         });
    //     });
    //     console.log(allExpenses);
    //   })
    // })