import { shallowMount } from '@vue/test-utils';
import Leaderboard from '@/components/Leaderboard.vue';

describe('Leaderboard.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message';
    const wrapper = shallowMount(Leaderboard, {
      propsData: { msg },
    });
    expect(wrapper.text()).toMatch(msg);
  });
});
