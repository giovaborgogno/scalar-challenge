from rest_framework_api.views import StandardAPIView
from rest_framework import status
from .models import *
from apps.user.models import UserAccount


class PartialUpdateUserView(StandardAPIView):
    def put(self, request, userId):
        try:
            try:     
                user = self.request.user
                if not (user.role =='admin' or user.is_staff):
                    return self.send_error(str('You have not permissions'), status=status.HTTP_401_UNAUTHORIZED)                
            except Exception:
                return self.send_error(str('You have not permissions'), status=status.HTTP_401_UNAUTHORIZED)
            
            user = UserAccount.objects.get(id=userId)
            
            try:
                data = self.request.data
                role = data['role']
                is_active = data['is_active']
                
                if not (role=='user' or role=='critic' or role=='admin'):
                    return self.send_error("Invalid data", status=status.HTTP_400_BAD_REQUEST)
                if not (is_active==False or is_active==True):
                    return self.send_error("Invalid data", status=status.HTTP_400_BAD_REQUEST)
            except:
                return self.send_error("Invalid data", status=status.HTTP_400_BAD_REQUEST)
            
            if role == 'admin':
                is_staff = True
            else:
                is_staff = False
            
            user.role = role
            user.is_staff = is_staff
            user.is_active = is_active
            
            user.save()
            
            return self.send_response({}, status=status.HTTP_204_NO_CONTENT)
            
        except UserAccount.DoesNotExist:
            return self.send_error("Invalid movie user id", status=status.HTTP_404_NOT_FOUND)
            
        except Exception as e:
            return self.send_error("Internal Server Error", status=status.HTTP_500_INTERNAL_SERVER_ERROR)