import React, {useEffect} from 'react';
import './App.scss';
import {IStudent, IStudentsState} from "./store/students/students.models";
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "./store";
import {
    studentChangeEditModel,
    studentResetEditModel,
    studentsCreateAsync,
    studentsDeleteAsync,
    studentsFetchAsync, studentStartEditModel,
    studentsUpdateAsync
} from "./store/students/students.actions";
import provider, {defaultLocalStorage} from "./store/data.provider";
import {StudentRow} from "./components/StudentRow";
import {StudentForm} from "./components/StudentForm";

const App: React.FC = () => {
  const studentsState: IStudentsState = useSelector((state: AppState) => state.students);
  const dispatch = useDispatch();
  function submitHandler(isNew: boolean, model: IStudent) {
      if (isNew) {
          dispatch(studentsCreateAsync(model));
      } else {
          dispatch(studentsUpdateAsync({
              id: model.id,
              student: model,
          }))
      }
      dispatch(studentResetEditModel());
  }
  function updateHandler(item) {
      document.getElementById('formWrapper').focus();
      dispatch(studentStartEditModel(item));
  }
  function deleteHandler(id: number) {
      dispatch(studentsDeleteAsync(id));
  }
  useEffect(() => {
      dispatch(studentsFetchAsync());
  }, [
      dispatch,
  ]);
  return (
    <div className="pt-4 pb-4">
        <div className="container">
            <div className="mb-3" id="formWrapper">
                <StudentForm change={(data) => dispatch(studentChangeEditModel(data))}
                             reset={() => dispatch(studentResetEditModel())}
                             model={studentsState.form.model}
                             isNew={studentsState.form.isNew} submit={submitHandler}/>
            </div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>id</th>
                        <th>FullName</th>
                        <th>Birthday</th>
                        <th>Progress</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                {studentsState.students.map(student => {
                    return <tr key={student.id}>
                        <StudentRow model={student} delete={() => deleteHandler(student.id)}
                                   update={(model) => updateHandler(model)}/>
                    </tr>
                })}
                </tbody>
            </table>
        </div>
    </div>
  );
};
provider.initState(defaultLocalStorage).then(() => {}).catch((e) => {});

export default App;
