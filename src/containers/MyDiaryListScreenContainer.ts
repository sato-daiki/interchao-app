import { connect } from 'react-redux';
import {
  setDiaries,
  setDiaryTotalNum,
  editDiary,
} from '../stores/actions/diaryList';
import { setLocalStatus } from '../stores/actions/localStatus';
import { setUser } from '../stores/actions/user';
import { State } from '../types/state';
import MyDiaryListScreen, { Props } from '../screens/MyDiaryListScreen';

const mapStateToProps = (state: State): Props => {
  const { diaries, diaryTotalNum } = state.rootReducer.diaryList;
  return {
    localStatus: state.rootReducer.localStatus,
    user: state.rootReducer.user,
    diaries,
    diaryTotalNum,
  };
};

const mapDispatchToProps = {
  setLocalStatus,
  setUser,
  editDiary,
  setDiaries,
  setDiaryTotalNum,
};

export default connect(mapStateToProps, mapDispatchToProps)(MyDiaryListScreen);
