import { formatTime } from './formatTime.js';
import { discountPrice } from './discountPrice.js';

describe('utils', () => {
  describe ('formatTime', () => {
    it('should return null if there is no arg', () => {
      expect(formatTime()).toBe(null);
    });
    it('should return null if arg is not a number', () => {
      expect(formatTime('abc')).toBe(null);
      expect(formatTime(() => {})).toBe(null);
    });
    it('should return null if arg is lower than zero', () => {
      expect(formatTime(-1)).toBe(null);
      expect(formatTime(-2)).toBe(null);
    });
    it('should return time in hh:mm:ss if arg is proper', () => {
      expect(formatTime(122)).toBe('00:02:02');
      expect(formatTime(3793)).toBe('01:03:13');
      expect(formatTime(120)).toBe('00:02:00');
      expect(formatTime(3604)).toBe('01:00:04');
    });
  });

  describe('discountPrice', () => {
    /*     it('should return null if there is no arg', () => {
      expect(discountPrice()).toBe(null);
    }); */
    /*     it('should return null if one of arg is not a number', () => {
      expect(discountPrice('abc', 20)).toBe(null);
      expect(discountPrice(45357, 'abc')).toBe(null);
      expect(discountPrice('xyz', 'abc')).toBe(null);
      expect(discountPrice(()=>{}, 20)).toBe(null);
      expect(discountPrice(35632, ()=>{})).toBe(null);
    }); */
    it('should return null if one of arg is lower than 0',() => {
      expect(discountPrice(-3, 20)).toBe(null);
      expect(discountPrice(35364, -2)).toBe(null);
    });

    it('should return result less than first argument', () => {
      expect(discountPrice(34563, 20)).toBeLessThan(34563);
    });
    it('should return correct result', () => {
      expect(discountPrice(100, 20)).toBe(80);
      expect(discountPrice(5600, 100)).toBe(0);
      expect(discountPrice(10, 0)).toBe(10);
    });
  });
});
