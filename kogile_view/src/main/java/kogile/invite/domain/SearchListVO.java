package kogile.invite.domain;

import lombok.Data;

@Data
public class SearchListVO {
	
	private int no; //total_m_no
	private String name; //���� �̸�
	private String mail; //�̸���
	
	private int pjt_no;
	private String pjt_title;
	
}
