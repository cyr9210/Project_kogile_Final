package kogile.test.chat;

import static org.junit.Assert.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.junit.Ignore;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import kogile.chat.domain.ChatVO;
import kogile.chat.mapper.ChatMapper;
import lombok.Setter;
import lombok.extern.log4j.Log4j;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("file:src/main/webapp/WEB-INF/spring/root-context.xml")
@Log4j

/*
 * ä�� �׽�Ʈ.
 */

public class ChatMapperTests {
	
	@Setter(onMethod_={@Autowired})
	ChatMapper mapper;
	
	//1)���� Ŭ���̾�Ʈ�� ������ �ִ� ������ ä�ù�ȣ��
	//������Ʈ�� ������ ä�ù�ȣ�� ���ؼ�(4�� TC ����)
	//������ ��ŭ�� list�� ��ȯ�Ѵ�.
	
	@Test
	public void getNewChatListTest() {
		
		Map<String, String> arg = new HashMap<>();
		arg.put("pjt_no_input", "1");
		arg.put("chat_no_input", "1");
		
		List<ChatVO> list = mapper.getChatList(arg);
		
		if(list != null) {
			for(ChatVO chat:list) {
				System.out.println("�迭������:" + list.size());
				System.out.println(chat);
			}
		}else{
			log.info("getNewChatListTest Fail!");
			fail();
		}
	}
	
	//2)���ο� ä���� insert�ϴµ� �����Ѵ�.
	@Ignore
	@Test
	public void insertChatTest() {
		int res = mapper.chatRegister(new ChatVO(1, "sohee", "HwangSoheeBabo"));
		if(res < 0) {
			fail();
		}
	}
	
	//3)���ο� ä�� insert��, 
	//ä�� ���̺��� pjt�� ä�� ������ count�� ��,
	//�ֱ�ä�ù�ȣ�� �����ϴ� ���̺� pjt�� �ֱ�ä�ù�ȣ�� ������Ʈ �Ѵ�.
	//���� �׽�Ʈ ���� insert �� �Ʒ� ������ ������� ��!
	@Ignore
	@Test
	public void updateLastChatNumTest() {
		int res = mapper.updateLastChatNo(1);
		if(res < 0) {
			fail();
		}else {
			log.info("update LastChatNum!"+ res);
		}
	}
	@Ignore
	@Test
	public void getLastChatNumFromTableTest() {
		 int lastChatNo =  mapper.selectLastChatNo(1);
	}
	
}
