import { connect } from 'react-redux';
import { setDiaries, setDiaryTotalNum } from '../stores/actions/diaryList';
import { State } from '../types/state';
import MyDiaryListScreen from '../screens/MyDiaryListScreen';

const mapStateToProps = (state: State) => {
  const { diaries, diaryTotalNum } = state.rootReducer.diaryList;
  return {
    user: state.rootReducer.user,
    diaries,
    diaryTotalNum,
  };
};

const mapDispatchToProps = {
  setDiaries,
  setDiaryTotalNum,
};

export default connect(mapStateToProps, mapDispatchToProps)(MyDiaryListScreen);
