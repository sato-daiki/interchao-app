import { connect } from 'react-redux';
import MyDiaryListScreen, {
  Props,
} from '@/screens/MyDiaryListScreen/MyDiaryListScreen';
import { setLocalStatus } from '@/stores/actions/localStatus';
import { setUser } from '@/stores/actions/user';
import { State } from '@/types/state';
import {
  setDiaries,
  setDiaryTotalNum,
  editDiary,
  setFetchInfo,
} from '@/stores/actions/diaryList';

const mapStateToProps = (state: State): Props => {
  const { diaries, diaryTotalNum, fetchInfo } = state.rootReducer.diaryList;
  return {
    localStatus: state.rootReducer.localStatus,
    user: state.rootReducer.user,
    profile: state.rootReducer.profile,
    diaries,
    diaryTotalNum,
    fetchInfo,
  };
};

const mapDispatchToProps = {
  setLocalStatus,
  setUser,
  editDiary,
  setDiaries,
  setDiaryTotalNum,
  setFetchInfo,
};

export default connect(mapStateToProps, mapDispatchToProps)(MyDiaryListScreen);
